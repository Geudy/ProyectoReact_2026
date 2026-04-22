"use client";
import { useEffect, useState } from 'react';
import { useKanbanStore } from '../../store/kanbanStore';
import { mockTasks, Task } from '../../features/task/utils/mockData';
import { useFilters } from '../../hooks/useFilters';
import { TaskCard } from '../molecules';
import { KanbanBoard } from './KanbanBoard';
import { AddTaskForm } from './AddTaskForm';
import { TaskFilters } from './TaskFilters';
import { EditTaskForm } from '../molecules/EditTaskForm';

export const TaskListContainer: React.FC = () => {
    const { tasks, setTasks, addTask, updateTask, deleteTask } = useKanbanStore();
    const { filters } = useFilters();
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        if (tasks.length === 0) {
            setTasks(mockTasks);
        }
    }, [tasks.length, setTasks]);

    const filteredTasks = tasks.filter(task => {
        if (!filters.search) return true;
        const search = filters.search.toLowerCase();
        return (
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search) ||
            task.status.toLowerCase().includes(search) ||
            task.priority.toLowerCase().includes(search)
        );
    });
    return (
        <div style={{ margin: '32px auto', maxWidth: 1200, padding: '0 24px' }}>
            <button
                aria-label="Volver"
                onClick={() => window.history.back()}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    marginBottom: 8,
                    color: '#757575',
                    borderRadius: 4,
                    padding: '4px 8px',
                }}
            >
                ← Regresar
            </button>
            <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: '2em', color: '#222' }}>Administración de tareas</h2>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', gap: 16, marginBottom: 8 }}>
                <AddTaskForm onAdd={addTask} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <TaskFilters />
            </div>
            <KanbanBoard
                tasks={filteredTasks}
                renderTask={(task: Task) => (
                    editingId === task.id ? (
                        <EditTaskForm
                            key={task.id}
                            task={task}
                            onSave={updates => {
                                updateTask(task.id, updates);
                                setEditingId(null);
                            }}
                            onCancel={() => setEditingId(null)}
                        />
                    ) : (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={() => setEditingId(task.id)}
                            onDelete={() => deleteTask(task.id)}
                        />
                    )
                )}
            />
        </div>
    );
};
