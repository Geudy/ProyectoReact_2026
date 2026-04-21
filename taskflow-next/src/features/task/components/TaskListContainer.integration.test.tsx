import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskListContainer } from './TaskListContainer';
import * as useTasksHook from '../hooks/useTasks';
import { Task } from '../utils/mockData';

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
    render(<TaskListContainer />);
    // Agregar tarea
    fireEvent.change(screen.getByPlaceholderText('Título'), { target: { value: 'Nueva tarea' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Descripción nueva' } });
    fireEvent.click(screen.getByText('Agregar tarea'));
    // Espera a que aparezca la tarea (mock async)
    await waitFor(() => {
      expect(screen.getByText(/Nueva tarea/i)).toBeInTheDocument();
    });
    // Eliminar tarea
    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]);
    // Espera a que desaparezca
    await waitFor(() => {
      expect(screen.queryByText(/Nueva tarea/i)).not.toBeInTheDocument();
    });
  });

  it('filtra tareas por estado', async () => {
    render(<TaskListContainer />);
    // Cambia el filtro a "Completadas"
    fireEvent.click(screen.getByText(/Completadas/i));
    await waitFor(() => {
      expect(screen.getByText(/Tarea 2/i)).toBeInTheDocument();
      expect(screen.queryByText(/Tarea 1/i)).not.toBeInTheDocument();
    });
  });
});
