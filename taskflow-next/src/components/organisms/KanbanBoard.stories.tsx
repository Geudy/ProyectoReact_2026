import React from 'react';
import { KanbanBoard } from './KanbanBoard';
import { Task } from '../../features/task/utils/mockData';

const mockTasks: Task[] = [
  {
      id: '1', title: 'Task 1', status: 'Pendiente', description: '', priority: 'Alta',
      project: '',
      createdAt: ''
  },
  {
      id: '2', title: 'Task 2', status: 'En progreso', description: '', priority: 'Media',
      project: '',
      createdAt: ''
  },
  {
      id: '3', title: 'Task 3', status: 'Terminado', description: '', priority: 'Baja',
      project: '',
      createdAt: ''
  },
];

export default {
  title: 'Organisms/KanbanBoard',
  component: KanbanBoard,
};

export const Default = () => (
  <KanbanBoard renderTask={(task: Task) => <div key={task.id}>{task.title}</div>} tasks={[]} />
);
