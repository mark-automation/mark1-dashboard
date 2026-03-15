import { Settings as SettingsIcon, Bell, RefreshCw, Moon, Sun, Monitor } from 'lucide-react';
import type { Settings } from '../types';

interface SettingsPanelProps {
  settings: Settings;
  onUpdateSettings: (settings: Settings) => void;
}

export function SettingsPanel({ settings, onUpdateSettings }: SettingsPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Settings</h2>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Notifications</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Push notifications for events</div>
            </div>
          </div>
          <button
            onClick={() => onUpdateSettings({ ...settings, notifications: !settings.notifications })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Auto-refresh */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Auto-refresh</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Update interval</div>
            </div>
          </div>
          <select
            value={settings.autoRefreshInterval}
            onChange={(e) => onUpdateSettings({ ...settings, autoRefreshInterval: Number(e.target.value) })}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100"
          >
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>
        </div>

        {/* Theme */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Theme</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Appearance preference</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'System', icon: Monitor },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onUpdateSettings({ ...settings, theme: value as Settings['theme'] })}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                  settings.theme === value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  settings.theme === value 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-slate-500 dark:text-slate-400'
                }`} />
                <span className={`text-xs ${
                  settings.theme === value 
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
