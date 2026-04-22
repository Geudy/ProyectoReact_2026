import { act, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTasks } from './useTasks';
import { Task } from '../utils/mockData';

describe('useTasks', () => {
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

  it('devuelve tareas iniciales', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.filteredTasks).toHaveLength(2);
    expect(result.current.stats.total).toBe(2);
  });

  it('agrega una tarea', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.addTask({
        id: '3',
        title: 'Nueva',
        description: 'Desc',
        status: 'todo',
        priority: 'low',
        project: '',
        createdAt: '2026-04-03',
      });
    });
    expect(result.current.tasks).toHaveLength(3);
    expect(result.current.stats.total).toBe(3);
  });

  it('elimina una tarea', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.deleteTask('1');
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe('2');
  });

  it('actualiza una tarea', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.updateTask('1', { title: 'Actualizada' });
    });
    expect(result.current.tasks[0].title).toBe('Actualizada');
  });

  it('filtra tareas por estado', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.setFilter('done');
    });
    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].status).toBe('done');
  });

  it('ordena tareas por estado', () => {
    const { result } = renderHook(() => useTasks(initialTasks));
    act(() => {
      result.current.sortByStatus();
    });
    expect(result.current.tasks[0].status).toBe('todo');
    expect(result.current.tasks[1].status).toBe('done');
  });
});
