import { ListTodo, Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import type { Task } from '../types';

interface TaskQueueProps {
  tasks: Task[];
}

export function TaskQueue({ tasks }: TaskQueueProps) {
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'complete');

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Circle className="w-4 h-4 text-slate-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'complete':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const TaskItem = ({ task }: { task: Task }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
      <div className="flex-shrink-0">{getStatusIcon(task.status)}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {task.description}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatTime(task.createdAt)}
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
        {task.priority}
      </span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <ListTodo className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Task Queue</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* In Progress */}
        {inProgressTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              In Progress ({inProgressTasks.length})
            </h3>
            <div className="space-y-2">
              {inProgressTasks.map(task => <TaskItem key={task.id} task={task} />)}
            </div>
          </div>
        )}

        {/* Pending */}
        {pendingTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Pending ({pendingTasks.length})
            </h3>
            <div className="space-y-2">
              {pendingTasks.map(task => <TaskItem key={task.id} task={task} />)}
            </div>
          </div>
        )}

        {/* Completed */}
        {completedTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Completed (24h) ({completedTasks.length})
            </h3>
            <div className="space-y-2 opacity-75">
              {completedTasks.map(task => <TaskItem key={task.id} task={task} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
