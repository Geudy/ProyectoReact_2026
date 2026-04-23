
import React from 'react';
import { Task } from '@/features/task/utils/mockData';
import { Badge } from '../atoms/Badge';

export const TaskCard: React.FC<{ task: Task; onEdit?: (task: Task) => void; onDelete?: () => void }> = ({ task, onEdit, onDelete }) => (
    <div style={{ marginBottom: 24 }}>
        <div className="task-card" aria-label={`Tarea: ${task.title}`}>
            <div
                style={{
                    background:
                        task.priority === 'Baja'
                            ? '#47F51F'
                            : task.priority === 'Media'
                                ? '#F3D11C'
                                : task.priority === 'Alta'
                                    ? '#F53535'
                                    : undefined,
                    borderRadius: 6,
                    padding: '4px 12px',
                    marginBottom: 10,
                    display: 'inline-block',
                    fontWeight: 500,
                    fontSize: '0.95em',
                    border: '1px solid #e0e0e0',
                }}
            >
                <Badge color={task.priority.toLowerCase()}>{task.priority}</Badge>
            </div>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button className="edit-btn" aria-label="Editar tarea" onClick={() => onEdit && onEdit({
                    id: '',
                    title: '',
                    description: '',
                    status: 'Pendiente',
                    priority: 'Baja',
                    project: '',
                    createdAt: ''
                })}>✏️</button>
                <button className="delete-btn" aria-label="Eliminar tarea" onClick={onDelete}>🗑️</button>
            </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #e5e9f0', margin: '16px 0 0 0' }} />
    </div>
);
