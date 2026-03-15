# Mark1 Control Center

A monitoring dashboard for the Mark1 AI agent. Built with React, TypeScript, Tailwind CSS, and Recharts.

![Dashboard Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Mark1+Control+Center)

## Features

- **Real-time System Monitoring**: CPU, Memory, and Disk usage with visual charts
- **Ollama Integration**: Monitor model status and context usage
- **Gateway Status**: Online/offline indicator with pulse animation
- **Active Agents Panel**: View and manage running subagents with progress tracking
- **Task Queue**: Organized view of pending, in-progress, and completed tasks
- **Activity Timeline**: Filterable feed of recent actions (commits, files, API calls, system events)
- **Quick Actions**: Free memory, check health, view logs, send messages
- **Settings Panel**: Notifications, auto-refresh interval, theme toggle
- **PWA Support**: Install as a standalone app on mobile and desktop
- **Dark Mode**: Full dark theme support with system preference detection
- **Mobile-First**: Responsive design optimized for phones and tablets

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or navigate to the project:
```bash
cd projects/mark1-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
mark1-dashboard/
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service worker
│   ├── icon-192.png       # App icon (192px)
│   └── icon-512.png       # App icon (512px)
├── src/
│   ├── components/        # React components
│   │   ├── StatusCard.tsx
│   │   ├── SystemHealthCard.tsx
│   │   ├── OllamaStatusCard.tsx
│   │   ├── LastActivityCard.tsx
│   │   ├── ActiveAgentsPanel.tsx
│   │   ├── TaskQueue.tsx
│   │   ├── ActivityTimeline.tsx
│   │   ├── QuickActions.tsx
│   │   └── SettingsPanel.tsx
│   ├── types.ts           # TypeScript interfaces
│   ├── mockData.ts        # Mock data for development
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles + Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## Dashboard Sections

### 1. Status Overview (Hero Cards)
Four cards showing:
- **System Health**: CPU, Memory, Disk usage with donut charts
- **Ollama Status**: Model loaded, context usage bar
- **Gateway Status**: Online/offline with animated status dot
- **Last Activity**: Timestamp with live indicator

### 2. Active Agents Panel
- List of running subagents
- Shows: Name, Task, Status, Progress %
- Click to expand for details
- Cancel button for running agents
- Color-coded status badges

### 3. Task Queue
- Three sections: Pending, In-Progress, Completed (24h)
- Priority badges (High/Medium/Low)
- Status icons and timestamps

### 4. Activity Timeline
- Scrollable feed of recent actions
- Filter by type: All, Code, Files, API, System
- Visual timeline with connecting lines
- Relative timestamps

### 5. Quick Actions
- **Free Memory**: Simulates memory cleanup
- **Check Health**: Triggers data refresh
- **View Logs**: Placeholder for log viewer
- **Send Message**: Input to send messages to Mark1

### 6. Settings Panel
- **Notifications**: Toggle push notifications
- **Auto-refresh**: 10s, 30s, 1m, 5m intervals
- **Theme**: Light, Dark, or System preference

## Data Structure

```typescript
interface AgentStatus {
  id: string;
  name: string;
  task: string;
  status: 'running' | 'complete' | 'failed';
  progress: number;
  startedAt: string;
  eta?: string;
}

interface SystemStatus {
  cpu: number;
  memory: number;
  disk: number;
  ollamaContext: number;
  ollamaMaxContext: number;
  gatewayOnline: boolean;
}

interface Task {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'complete';
  createdAt: string;
}

interface Activity {
  id: string;
  type: 'commit' | 'file' | 'api' | 'system';
  description: string;
  timestamp: string;
}
```

## Features in Detail

### Auto-refresh
- Configurable interval (default: 30 seconds)
- Visual refresh indicator in header
- Updates system metrics and agent progress

### Mobile Support
- Pull-to-refresh gesture
- Bottom navigation on mobile
- Touch-friendly buttons and inputs
- "Add to Home" prompt for PWA install

### Dark Mode
- Respects system preference
- Manual toggle in settings
- Smooth transitions between themes

### PWA
- Works offline with service worker
- Installable on iOS, Android, and desktop
- Push notification support (mock)

## Customization

### Adding Real Data

Replace the mock data in `src/mockData.ts` with actual API calls:

```typescript
// Example: Fetch real system status
export async function fetchSystemStatus(): Promise<SystemStatus> {
  const response = await fetch('/api/system/status');
  return response.json();
}
```

### Theming

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
    }
  }
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome for Android

## License

MIT

## Credits

Built for the Mark1 AI agent ecosystem.
