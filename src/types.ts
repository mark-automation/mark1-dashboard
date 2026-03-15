export interface AgentStatus {
  id: string;
  name: string;
  task: string;
  status: 'running' | 'complete' | 'failed';
  progress: number;
  startedAt: string;
  eta?: string;
}

export interface SystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  ollamaContext: number;
  ollamaMaxContext: number;
  gatewayOnline: boolean;
}

export interface Task {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'complete';
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'commit' | 'file' | 'api' | 'system';
  description: string;
  timestamp: string;
}

export interface Settings {
  notifications: boolean;
  autoRefreshInterval: number;
  theme: 'light' | 'dark' | 'system';
}
