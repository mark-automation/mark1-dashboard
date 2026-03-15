import { useState } from 'react';
import { History, GitCommit, FileText, Globe, Settings, Filter } from 'lucide-react';
import type { Activity } from '../types';

interface ActivityTimelineProps {
  activities: Activity[];
}

type ActivityType = 'all' | 'commit' | 'file' | 'api' | 'system';

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const [filter, setFilter] = useState<ActivityType>('all');

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'commit':
        return <GitCommit className="w-4 h-4" />;
      case 'file':
        return <FileText className="w-4 h-4" />;
      case 'api':
        return <Globe className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'commit':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'file':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'api':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'system':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  const filters: { type: ActivityType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'commit', label: 'Code' },
    { type: 'file', label: 'Files' },
    { type: 'api', label: 'API' },
    { type: 'system', label: 'System' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Activity Timeline</h2>
          </div>
          <Filter className="w-4 h-4 text-slate-400" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filters.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filter === type
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                {index < filteredActivities.length - 1 && (
                  <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700 my-2" />
                )}
              </div>
              
              <div className="flex-1 pb-4">
                <div className="text-sm text-slate-900 dark:text-slate-100">
                  {activity.description}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {formatTime(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
