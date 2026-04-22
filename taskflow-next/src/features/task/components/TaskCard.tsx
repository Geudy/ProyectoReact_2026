import type { Task, TaskPriority } from '../utils/mockData';
import { Badge } from '@/shared/ui/atoms/Badge';
import { Card } from '@/shared/ui/molecules/Card';

interface TaskCardProps {
   task: Task;
   onClick?: () => void;
   onDelete?: () => void;
   onToggleDone?: () => void;
}

const priorityColors: Record<TaskPriority, string> = {
   high: '#ef4444',
   medium: '#f59e0b',
   low: '#22c55e',
};

export function TaskCard({ task, onClick, onDelete, onToggleDone }: TaskCardProps) {
   return (
      <Card onClick={onClick}>
         <Card.Header
            title={task.title}
            actions={
               <>
                  <Badge label={task.priority} color={priorityColors[task.priority]} />
                  <button
                     onClick={onDelete}
                     aria-label="eliminar"
                     style={{ marginLeft: 8, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                  >🗑️</button>
                  <button
                     onClick={onToggleDone}
                     style={{ marginLeft: 8, color: '#22c55e', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                     {task.status === 'done' ? '↩️' : '✔️'}
                  </button>
               </>
            }
         />
         <p style={{ color: '#64748b', fontSize: '14px', margin: '8px 0' }}>{task.description}</p>
         <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', color: '#94a3b8' }}>
            <Badge label={task.status} variant="outline" color="#6b7280" />
         </div>
      </Card>
   );
}