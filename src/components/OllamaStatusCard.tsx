import { Brain, Wifi, WifiOff } from 'lucide-react';
import { StatusCard } from './StatusCard';
import type { SystemStatus } from '../types';

interface OllamaStatusCardProps {
  status: SystemStatus;
}

export function OllamaStatusCard({ status }: OllamaStatusCardProps) {
  const contextPercent = Math.round((status.ollamaContext / status.ollamaMaxContext) * 100);

  return (
    <StatusCard title="Ollama Status" icon={<Brain className="w-4 h-4" />}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">Model</span>
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">kimi-k2.5</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 status-dot" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Online</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Context Usage</span>
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{contextPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${contextPercent}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-500 text-right">
            {status.ollamaContext.toLocaleString()} / {status.ollamaMaxContext.toLocaleString()} tokens
          </div>
        </div>
      </div>
    </StatusCard>
  );
}

interface GatewayStatusCardProps {
  status: SystemStatus;
}

export function GatewayStatusCard({ status }: GatewayStatusCardProps) {
  return (
    <StatusCard title="Gateway" icon={status.gatewayOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}>
      <div className="flex flex-col items-center justify-center py-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
          status.gatewayOnline 
            ? 'bg-green-100 dark:bg-green-900/30' 
            : 'bg-red-100 dark:bg-red-900/30'
        }`}>
          {status.gatewayOnline ? (
            <Wifi className="w-8 h-8 text-green-600 dark:text-green-400" />
          ) : (
            <WifiOff className="w-8 h-8 text-red-600 dark:text-red-400" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            status.gatewayOnline 
              ? 'bg-green-500 status-dot' 
              : 'bg-red-500 status-dot-offline'
          }`} />
          <span className={`text-lg font-semibold ${
            status.gatewayOnline 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {status.gatewayOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Last ping: 2s ago
        </div>
      </div>
    </StatusCard>
  );
}
