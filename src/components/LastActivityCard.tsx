import { Clock } from 'lucide-react';
import { StatusCard } from './StatusCard';

interface LastActivityCardProps {
  lastActivity: string;
}

export function LastActivityCard({ lastActivity }: LastActivityCardProps) {
  return (
    <StatusCard title="Last Activity" icon={<Clock className="w-4 h-4" />}>
      <div className="flex flex-col items-center justify-center py-4">
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
          {lastActivity}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Active now
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Live updates</span>
        </div>
      </div>
    </StatusCard>
  );
}
