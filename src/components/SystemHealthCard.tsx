import { Activity, HardDrive, Cpu } from 'lucide-react';
import { StatusCard } from './StatusCard';
import type { SystemStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SystemHealthCardProps {
  status: SystemStatus;
}

export function SystemHealthCard({ status }: SystemHealthCardProps) {
  const cpuData = [
    { name: 'Used', value: status.cpu },
    { name: 'Free', value: 100 - status.cpu },
  ];

  const memoryData = [
    { name: 'Used', value: status.memory },
    { name: 'Free', value: 100 - status.memory },
  ];

  const diskData = [
    { name: 'Used', value: status.disk },
    { name: 'Free', value: 100 - status.disk },
  ];

  const COLORS = ['#3b82f6', '#e2e8f0'];

  const getUsageColor = (value: number) => {
    if (value > 80) return 'text-red-500';
    if (value > 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <StatusCard title="System Health" icon={<Activity className="w-4 h-4" />} className="col-span-2">
      <div className="grid grid-cols-3 gap-4">
        {/* CPU */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cpuData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {cpuData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[0] : COLORS[1]} className="dark:fill-slate-600" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-slate-400" />
            </div>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">CPU</span>
          <span className={`text-lg font-bold ${getUsageColor(status.cpu)}`}>{Math.round(status.cpu)}%</span>
        </div>

        {/* Memory */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={memoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {memoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#8b5cf6' : COLORS[1]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-5 h-5 text-slate-400" />
            </div>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Memory</span>
          <span className={`text-lg font-bold ${getUsageColor(status.memory)}`}>{Math.round(status.memory)}%</span>
        </div>

        {/* Disk */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={35}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {diskData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : COLORS[1]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-slate-400" />
            </div>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Disk</span>
          <span className={`text-lg font-bold ${getUsageColor(status.disk)}`}>{Math.round(status.disk)}%</span>
        </div>
      </div>
    </StatusCard>
  );
}
