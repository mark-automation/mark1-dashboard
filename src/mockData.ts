import type { AgentStatus, SystemStatus, Task, Activity, Settings } from './types';

export const mockSystemStatus: SystemStatus = {
  cpu: 42,
  memory: 68,
  disk: 45,
  ollamaContext: 4096,
  ollamaMaxContext: 8192,
  gatewayOnline: true,
};

export const mockAgents: AgentStatus[] = [
  {
    id: 'agent-1',
    name: 'Code Reviewer',
    task: 'Analyzing PR #247',
    status: 'running',
    progress: 65,
    startedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    eta: '3 min',
  },
  {
    id: 'agent-2',
    name: 'File Organizer',
    task: 'Sorting downloads folder',
    status: 'running',
    progress: 34,
    startedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    eta: '8 min',
  },
  {
    id: 'agent-3',
    name: 'Web Scraper',
    task: 'Fetching weather data',
    status: 'complete',
    progress: 100,
    startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'agent-4',
    name: 'Email Processor',
    task: 'Processing inbox',
    status: 'failed',
    progress: 78,
    startedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    description: 'Backup database to S3',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'task-2',
    description: 'Update dependencies',
    priority: 'medium',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'task-3',
    description: 'Clean up temp files',
    priority: 'low',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'task-4',
    description: 'Generate weekly report',
    priority: 'high',
    status: 'complete',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'task-5',
    description: 'Sync with cloud storage',
    priority: 'medium',
    status: 'complete',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'task-6',
    description: 'Check SSL certificates',
    priority: 'high',
    status: 'complete',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'commit',
    description: 'Pushed 3 commits to main branch',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 'act-2',
    type: 'file',
    description: 'Modified config.json',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'act-3',
    type: 'api',
    description: 'Called OpenAI API (completion)',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    id: 'act-4',
    type: 'system',
    description: 'Memory cleanup completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'act-5',
    type: 'commit',
    description: 'Merged PR #246: Fix navigation bug',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'act-6',
    type: 'file',
    description: 'Created backup_2026-03-15.zip',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 'act-7',
    type: 'api',
    description: 'Fetched weather data for London',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'act-8',
    type: 'system',
    description: 'Agent "Web Scraper" completed task',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'act-9',
    type: 'commit',
    description: 'Pushed to feature/dashboard-ui',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'act-10',
    type: 'file',
    description: 'Deleted 12 temp files',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

export const defaultSettings: Settings = {
  notifications: true,
  autoRefreshInterval: 30,
  theme: 'system',
};

// Simulate data updates
export function getUpdatedSystemStatus(): SystemStatus {
  return {
    ...mockSystemStatus,
    cpu: Math.max(10, Math.min(90, mockSystemStatus.cpu + (Math.random() - 0.5) * 10)),
    memory: Math.max(20, Math.min(95, mockSystemStatus.memory + (Math.random() - 0.5) * 5)),
  };
}
