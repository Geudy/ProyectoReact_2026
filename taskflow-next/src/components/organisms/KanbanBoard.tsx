import React from 'react';
import styles from './KanbanBoard.module.css';
import { Task } from '../../features/task/utils/mockData';

interface KanbanColumnProps {
  status: string;
  children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, children }) => (
  <div className={styles['kanban-column']} data-status={status}>
    <h3>{status}</h3>
    {children}
  </div>
);

interface KanbanBoardProps {
  renderTask: (task: Task) => React.ReactNode;
  tasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> & { Column: typeof KanbanColumn } = ({ renderTask, tasks }) => {
  const statuses = ['Pendiente', 'En progreso', 'Terminado'];

  return (
    <div className={styles['kanban-board']}>
      {statuses.map(status => (
        <KanbanColumn key={status} status={status}>
          {tasks.filter(t => t.status === status).map(renderTask)}
        </KanbanColumn>
      ))}
    </div>
  );
};

KanbanBoard.Column = KanbanColumn;
