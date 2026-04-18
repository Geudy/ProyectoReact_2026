"use client";
import { Task } from '../../utils/mockData';

interface TaskListProps {
    tasks: Task[];
    filter: string;
    onAddTask: (taskData: Partial<Task>) => void;
    onDeleteTask: (id: string) => void;
    onFilterChange: (filter: string) => void;
}

export function TaskList({ tasks, filter, onAddTask, onDeleteTask, onFilterChange }: TaskListProps) {
    return (
        <div className="task-list">
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" />
                        <span>{task.title}</span>
                        <button onClick={() => onDeleteTask(task.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => onAddTask({ title: 'Nueva tarea' })}>
                Añadir tarea
            </button>
        </div>
    );
}

