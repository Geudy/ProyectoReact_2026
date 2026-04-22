import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../features/task/utils/mockData';

interface KanbanState {
  tasks: Task[];
  moveTask: (id: string, newStatus: Task['status']) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      tasks: [],
      moveTask: (id, newStatus) => {
        set({
          tasks: get().tasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
        });
      },
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set(state => ({
        tasks: [
          ...state.tasks,
          { ...task, id: Date.now().toString(), createdAt: new Date().toISOString() }
        ]
      })),
      updateTask: (id, updates) => set(state => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      deleteTask: (id) => set(state => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),
    }),
    { name: 'kanban-tasks' }
  )
);
