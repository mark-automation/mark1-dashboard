import { useState } from 'react';
import { Bot, ChevronDown, ChevronUp, X, Play, CheckCircle, AlertCircle } from 'lucide-react';
import type { AgentStatus } from '../types';

interface ActiveAgentsPanelProps {
  agents: AgentStatus[];
  onCancelAgent: (id: string) => void;
}

export function ActiveAgentsPanel({ agents, onCancelAgent }: ActiveAgentsPanelProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const getStatusIcon = (status: AgentStatus['status']) => {
    switch (status) {
      case 'running':
        return <Play className="w-4 h-4 text-blue-500" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: AgentStatus['status']) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'complete':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Active Agents</h2>
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {agents.filter(a => a.status === 'running').length} running
        </span>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {agents.map((agent) => (
          <div key={agent.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(agent.status)}`}>
                  {getStatusIcon(agent.status)}
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">{agent.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{agent.task}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{agent.progress}%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{agent.status}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedAgent(expandedAgent === agent.id ? null : agent.id);
                  }}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                >
                  {expandedAgent === agent.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    agent.status === 'failed' 
                      ? 'bg-red-500' 
                      : agent.status === 'complete' 
                        ? 'bg-green-500' 
                        : 'bg-blue-500'
                  }`}
                  style={{ width: `${agent.progress}%` }}
                />
              </div>
            </div>

            {/* Expanded details */}
            {expandedAgent === agent.id && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Started: </span>
                    <span className="text-slate-900 dark:text-slate-100">{formatTime(agent.startedAt)}</span>
                  </div>
                  {agent.eta && (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">ETA: </span>
                      <span className="text-slate-900 dark:text-slate-100">{agent.eta}</span>
                    </div>
                  )}
                </div>
                
                {agent.status === 'running' && (
                  <button
                    onClick={() => onCancelAgent(agent.id)}
                    className="mt-4 flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel Agent
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
