import type { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function StatusCard({ title, children, icon, className = '' }: StatusCardProps) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-slate-500 dark:text-slate-400">{icon}</span>}
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
