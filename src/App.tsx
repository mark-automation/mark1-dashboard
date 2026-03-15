import { useState, useEffect, useCallback } from 'react';
import { Menu, X, RefreshCw, Bot, Smartphone } from 'lucide-react';
import { SystemHealthCard } from './components/SystemHealthCard';
import { OllamaStatusCard, GatewayStatusCard } from './components/OllamaStatusCard';
import { LastActivityCard } from './components/LastActivityCard';
import { ActiveAgentsPanel } from './components/ActiveAgentsPanel';
import { TaskQueue } from './components/TaskQueue';
import { ActivityTimeline } from './components/ActivityTimeline';
import { QuickActions } from './components/QuickActions';
import { SettingsPanel } from './components/SettingsPanel';
import { 
  mockSystemStatus, 
  mockAgents, 
  mockTasks, 
  mockActivities, 
  defaultSettings,
  getUpdatedSystemStatus 
} from './mockData';
import type { AgentStatus, SystemStatus, Task, Activity, Settings } from './types';

function App() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(mockSystemStatus);
  const [agents, setAgents] = useState<AgentStatus[]>(mockAgents);
  const [tasks] = useState<Task[]>(mockTasks);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [lastActivity, setLastActivity] = useState('Active 2 minutes ago');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'tasks' | 'activity' | 'settings'>('overview');

  // Theme handling
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      if (settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    applyTheme();
  }, [settings.theme]);

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, settings.autoRefreshInterval * 1000);
    return () => clearInterval(interval);
  }, [settings.autoRefreshInterval]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate data update
    setTimeout(() => {
      setSystemStatus(getUpdatedSystemStatus());
      setAgents(prev => prev.map(agent => 
        agent.status === 'running' 
          ? { ...agent, progress: Math.min(100, agent.progress + Math.random() * 5) }
          : agent
      ));
      setLastActivity('Active just now');
      setIsRefreshing(false);
    }, 500);
  }, []);

  const handleCancelAgent = (id: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, status: 'failed', progress: 0 } : agent
    ));
  };

  const handleFreeMemory = () => {
    setSystemStatus(prev => ({ ...prev, memory: Math.max(20, prev.memory - 20) }));
    setActivities(prev => [{
      id: `act-${Date.now()}`,
      type: 'system',
      description: 'Memory cleanup completed',
      timestamp: new Date().toISOString(),
    }, ...prev]);
  };

  const handleCheckHealth = () => {
    handleRefresh();
  };

  const handleViewLogs = () => {
    alert('Logs would open in a new view');
  };

  const handleSendMessage = (message: string) => {
    setActivities(prev => [{
      id: `act-${Date.now()}`,
      type: 'system',
      description: `Message sent: "${message.substring(0, 30)}${message.length > 30 ? '...' : ''}"`,
      timestamp: new Date().toISOString(),
    }, ...prev]);
  };

  const handleUpdateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  // Pull to refresh for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchEnd - touchStart > 100 && window.scrollY === 0) {
      handleRefresh();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SystemHealthCard status={systemStatus} />
              <OllamaStatusCard status={systemStatus} />
              <GatewayStatusCard status={systemStatus} />
              <LastActivityCard lastActivity={lastActivity} />
            </div>

            {/* Quick Actions */}
            <QuickActions 
              onFreeMemory={handleFreeMemory}
              onCheckHealth={handleCheckHealth}
              onViewLogs={handleViewLogs}
              onSendMessage={handleSendMessage}
            />

            {/* Active Agents Preview */}
            <ActiveAgentsPanel agents={agents.slice(0, 3)} onCancelAgent={handleCancelAgent} />
          </div>
        );
      case 'agents':
        return <ActiveAgentsPanel agents={agents} onCancelAgent={handleCancelAgent} />;
      case 'tasks':
        return <TaskQueue tasks={tasks} />;
      case 'activity':
        return <ActivityTimeline activities={activities} />;
      case 'settings':
        return <SettingsPanel settings={settings} onUpdateSettings={handleUpdateSettings} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Mark1 Control Center</h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-green-500 status-dot" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-2 space-y-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'agents', label: 'Agents' },
                { id: 'tasks', label: 'Tasks' },
                { id: 'activity', label: 'Activity' },
                { id: 'settings', label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as typeof activeTab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'agents', label: 'Agents' },
              { id: 'tasks', label: 'Tasks' },
              { id: 'activity', label: 'Activity' },
              { id: 'settings', label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === item.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </main>

      {/* PWA Install Prompt (mock) */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
          <Smartphone className="w-4 h-4" />
          Add to Home
        </button>
      </div>
    </div>
  );
}

export default App;
