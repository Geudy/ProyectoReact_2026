import React, { useState } from 'react';
import { Task, TASK_PRIORITIES, TASK_STATUSES } from '../../features/task/utils/mockData';

interface EditTaskFormProps {
  task: Task;
  onSave: (updates: { priority: Task['priority']; status: Task['status'] }) => void;
  onCancel: () => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSave, onCancel }) => {
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ priority, status });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <select value={priority} onChange={e => setPriority(e.target.value as Task['priority'])}>
        {Object.values(TASK_PRIORITIES).map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <select value={status} onChange={e => setStatus(e.target.value as Task['status'])}>
        {Object.values(TASK_STATUSES).map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};
