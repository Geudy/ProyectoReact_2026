import React, { useState } from 'react';
import type { Task } from '../../features/task/utils/mockData';
import { TASK_PRIORITIES, TASK_STATUSES } from '../../features/task/utils/mockData';

interface AddTaskFormProps {
  onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<(typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES]>('Baja');
  const [status, setStatus] = useState<(typeof TASK_STATUSES)[keyof typeof TASK_STATUSES]>('Pendiente');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
        title,
        description,
        priority,
        status,
        project: ''
    });
    setTitle('');
    setDescription('');
    setPriority('Baja');
    setStatus('Pendiente');
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      padding: 20,
      marginBottom: 16,
      border: '1px solid #e5e9f0',
      maxWidth: 900
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 140, marginRight: 8 }}>
          <label htmlFor="add-title" style={{ marginBottom: 4, fontWeight: 500 }}>Título</label>
          <input id="add-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required style={{ padding: 6, borderRadius: 4, border: '1px solid #d8dee9' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 200, marginRight: 8 }}>
          <label htmlFor="add-description" style={{ marginBottom: 4, fontWeight: 500 }}>Descripción</label>
          <input id="add-description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" style={{ padding: 6, borderRadius: 4, border: '1px solid #d8dee9' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120, marginRight: 8 }}>
          <label htmlFor="add-priority" style={{ marginBottom: 4, fontWeight: 500 }}>Prioridad</label>
          <select id="add-priority" value={priority} onChange={e => setPriority(e.target.value as any)} style={{ padding: 6, borderRadius: 4, border: '1px solid #d8dee9' }}>
            {Object.entries(TASK_PRIORITIES).map(([k, v]) => <option key={k} value={v}>{v}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120, marginRight: 8 }}>
          <label htmlFor="add-status" style={{ marginBottom: 4, fontWeight: 500 }}>Estado</label>
          <select id="add-status" value={status} onChange={e => setStatus(e.target.value as any)} style={{ padding: 6, borderRadius: 4, border: '1px solid #d8dee9' }}>
            {Object.entries(TASK_STATUSES).map(([k, v]) => <option key={k} value={v}>{v}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', minWidth: 90, marginLeft: 8 }}>
          <button type="submit" style={{ padding: '8px 18px', borderRadius: 4, background: '#5e81ac', color: '#fff', border: 'none', fontWeight: 500, height: 40 }}>Agregar</button>
        </div>
      </form>
    </div>
  );
};
