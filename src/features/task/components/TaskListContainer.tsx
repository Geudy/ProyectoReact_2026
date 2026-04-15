import { useState } from 'react';
import { mockTasks } from '../utils/mockData';
import type { Task } from '../utils/mockData';
import TaskCard from './TaskCard';
import { Button } from '@/shared/ui/atoms/Button';
import { Input } from '@/shared/ui/atoms/Input';

type FilterValue = 'all' | Task['status'];
function TaskListContainer() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [filter] = useState<FilterValue>('all');
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);
    const handleAddTask = () => {        
        const newTask: Task = {
            id: (tasks.length + 1).toString(),
            title: nuevoTitulo,
            description: descripcion,
            status: 'todo',
            priority: 'medium',
            assignee: '',
            project: '',
            createdAt: new Date().toISOString(),
        };
        setTasks([newTask, ...tasks]);
    };
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>Tareas</h2>
                <Input style={{ backgroundColor: '#f1f5f9', color: 'black', maxWidth: '200px' }} placeholder="Título" 
                onChange={ e => setNuevoTitulo(e.target.value.toUpperCase())}/>   
                <Input style={{ backgroundColor: '#f1f5f9', color: 'black', maxWidth: '200px', marginLeft: '16px' }} placeholder="Descripción" 
                onChange={ e => setDescripcion(e.target.value.toUpperCase())}/>   
                <Button onClick={handleAddTask} style={{ marginLeft: 16 }}>Agregar tarea</Button>
            </div>
            
            <div>
                {filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
            
        </div>
    );
}
export default TaskListContainer;