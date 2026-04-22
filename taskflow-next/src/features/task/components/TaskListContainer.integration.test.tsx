import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { TaskListContainer } from './TaskListContainer';
import * as useAsyncHook from '../hooks/useAsync';
import * as useTasksHook from '../hooks/useTasks';
import { Task } from '../utils/mockData';
import { describe } from 'node:test';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Tarea 1',
    description: 'Desc 1',
    status: 'todo',
    priority: 'medium',
    project: '',
    createdAt: '2026-04-01',
  },
  {
    id: '2',
    title: 'Tarea 2',
    description: 'Desc 2',
    status: 'done',
    priority: 'high',
    project: '',
    createdAt: '2026-04-02',
  },
];

describe('TaskListContainer integración', () => {
  it('agrega y elimina tareas correctamente', async () => {
    // Mock de useAsync para simular delay
    jest.spyOn(useAsyncHook, 'useAsync').mockImplementation((fn) => {
      return {
        run: async (task) => {
          await new Promise(res => setTimeout(res, 10));
          fn(task);
        },
        loading: false,
        error: null,
      };
    });
    function Wrapper() {
      const [tasks, setTasks] = React.useState([...initialTasks]);
      const tasksRef = React.useRef(tasks);
      tasksRef.current = tasks;
      React.useEffect(() => { tasksRef.current = tasks; }, [tasks]);
      jest.spyOn(useTasksHook, 'useTasks').mockReturnValue({
        filteredTasks: tasks,
        filter: 'all',
        setFilter: jest.fn(),
        addTask: (task: Task) => setTasks([task, ...tasksRef.current]),
        deleteTask: (id: string) => setTasks(tasksRef.current.filter(t => t.id !== id)),
        updateTask: jest.fn(),
        sortByStatus: jest.fn(),
        stats: {
          total: tasks.length,
          byStatus: {
            todo: tasks.filter(t => t.status === 'todo').length,
            in_progress: 0,
            done: tasks.filter(t => t.status === 'done').length,
          },
        },
      });
      return <TaskListContainer />;
    }
    render(<Wrapper />);
    // Agregar tarea
    fireEvent.change(screen.getByPlaceholderText('Título'), { target: { value: 'Nueva tarea' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Descripción nueva' } });
    fireEvent.click(screen.getByText('Agregar tarea'));
    await waitFor(() => {
      expect(screen.getByText(/NUEVA TAREA/i)).toBeInTheDocument();
    });
    // Eliminar tarea
    fireEvent.click(screen.getAllByLabelText('eliminar')[0]);
    await waitFor(() => {
      expect(screen.queryByText(/NUEVA TAREA/i)).not.toBeInTheDocument();
    });
  });

  it('filtra tareas por estado', async () => {
    jest.spyOn(useTasksHook, 'useTasks').mockReturnValue({
      filteredTasks: [initialTasks[1]], // Solo la tarea completada
      filter: 'done',
      setFilter: jest.fn(),
      addTask: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
      sortByStatus: jest.fn(),
      stats: {
        total: 1,
        byStatus: { todo: 0, in_progress: 0, done: 1 },
      },
    });
    render(<TaskListContainer />);
    fireEvent.click(screen.getByRole('button', { name: /Completadas/i }));
    await waitFor(() => {
      expect(screen.getByText(/Tarea 2/i)).toBeInTheDocument();
      expect(screen.queryByText(/Tarea 1/i)).not.toBeInTheDocument();
    });
  });
});
