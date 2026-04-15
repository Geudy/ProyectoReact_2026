import type { Task, TaskPriority } from '../utils/mockData';
import { Badge } from '@/shared/ui/atoms/Badge';
import { Card } from '@/shared/ui/molecules/Card';

interface TaskCardProps {
   task: Task;
   onClick?: () => void;
}

const priorityColors: Record<TaskPriority, string> = {
   high: '#ef4444',
   medium: '#f59e0b',
   low: '#22c55e',
};

function TaskCard({ task, onClick }: TaskCardProps) {
   return (
      <Card onClick={onClick}>
         <Card.Header
            title={task.title}
            actions={
               <Badge
                  label={task.priority}
                  color={priorityColors[task.priority]}
               />
            }
         />
         <p  style={{ color: '#64748b', fontSize: '14px', margin: '8px 0' }} className="text-sm text-gray-600">{task.description}</p>
         <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', color: '#94a3b8' }} className="mt-3 flex items-center gap-2">
            <Badge label={task.status} variant="outline" color="#6b7280" />
         </div>
      </Card>
   );
}
export default TaskCard;