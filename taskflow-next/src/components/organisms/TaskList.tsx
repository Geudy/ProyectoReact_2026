import React from 'react';
import { Task } from '../../features/task/utils/mockData';
import { TaskCard } from '../molecules/TaskCard';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
  <div className="task-list">
    {tasks.map(task => <TaskCard key={task.id} task={task} />)}
  </div>
);
