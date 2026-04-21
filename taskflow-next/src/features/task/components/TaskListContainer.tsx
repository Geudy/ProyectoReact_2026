"use client";

import { useTasks } from '@/features/task/hooks';
import { useAsync } from '@/features/task/hooks/useAsync';
import { useForm } from '@/features/task/hooks/useForm';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import { Input, Button } from '@/shared/ui';
import { Task, TASK_STATUSES, TASK_PRIORITIES } from '../utils/mockData';
import { mockTasks } from '../utils/mockData';

export function TaskListContainer() {
    const {
        filteredTasks,
        filter,
        setFilter,
        addTask,
        deleteTask,
        updateTask,
        sortByStatus,
        stats,
    } = useTasks(mockTasks);

    const form = useForm(
        { titulo: '', descripcion: '' },
        (fields) => {
            const errors: { [k: string]: string } = {};
            if (!fields.titulo.trim()) errors.titulo = 'El título es obligatorio';
            if (!fields.descripcion.trim()) errors.descripcion = 'La descripción es obligatoria';
            return errors;
        }
    );

    // Hook para simular petición asíncrona al agregar tarea
    const asyncAddTask = useAsync(async (task: Task) => {
        // Simula un delay de red
        await new Promise(res => setTimeout(res, 1200));
        addTask(task);
    });

    const handleAddTask = () => {
        form.submit(async (values) => {
            const newTask: Task = {
                id: Date.now().toString(),
                title: values.titulo.toUpperCase(),
                description: values.descripcion.toUpperCase(),
                status: TASK_STATUSES.TODO,
                priority: TASK_PRIORITIES.MEDIUM,
                project: '',
                createdAt: new Date().toISOString(),
            };
            await asyncAddTask.run(newTask);
            form.handleChange({ target: { name: 'titulo', value: '' } } as any);
            form.handleChange({ target: { name: 'descripcion', value: '' } } as any);
        });
    };

    const handleDeleteTask = (id: string) => {
        deleteTask(id);
    };

    const handleToggleDone = (task: Task) => {
        updateTask(task.id, {
            status:
                task.status === TASK_STATUSES.DONE
                    ? TASK_STATUSES.TODO
                    : TASK_STATUSES.DONE,
        });
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <h2 style={{ margin: 0 }}>Tareas</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Input
                        name="titulo"
                        style={{ backgroundColor: '#f1f5f9', color: 'black', maxWidth: '200px' }}
                        placeholder="Título"
                        value={form.values.titulo}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        disabled={form.isSubmitting}
                    />
                    {form.touched.titulo && form.errors.titulo && (
                        <span style={{ color: 'red', fontSize: 13 }}>{form.errors.titulo}</span>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginLeft: 16 }}>
                    <Input
                        name="descripcion"
                        style={{ backgroundColor: '#f1f5f9', color: 'black', maxWidth: '200px' }}
                        placeholder="Descripción"
                        value={form.values.descripcion}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        disabled={form.isSubmitting}
                    />
                    {form.touched.descripcion && form.errors.descripcion && (
                        <span style={{ color: 'red', fontSize: 13 }}>{form.errors.descripcion}</span>
                    )}
                </div>
                <Button onClick={handleAddTask} style={{ marginLeft: 16 }} disabled={form.isSubmitting || asyncAddTask.loading}>
                    {(form.isSubmitting || asyncAddTask.loading) ? 'Agregando...' : 'Agregar tarea'}
                </Button>
                {asyncAddTask.error && (
                    <span style={{ color: 'red', fontSize: 13 }}>Error al agregar tarea</span>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <TaskFilters current={filter} onChange={setFilter} />
                <Button onClick={sortByStatus} style={{ marginLeft: 16 }}>
                    Ordenar por estado
                </Button>
            </div>
            <div style={{ margin: '16px 0', color: '#64748b', fontSize: '15px' }}>
                Total: {stats.total} | Por hacer: {stats.byStatus.todo} | En progreso: {stats.byStatus.in_progress} | Completadas: {stats.byStatus.done}
            </div>
            {filteredTasks.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '32px', color: '#555' }}>
                    No hay tareas para mostrar
                </p>
            ) : (
                filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={() => handleDeleteTask(task.id)}
                        onToggleDone={() => handleToggleDone(task)}
                    />
                ))
            )}
        </div>
    );
}