# Workflow Monitoring Dashboard

A modern, production-ready React dashboard for monitoring automation workflows and jobs. Built with React 18, Vite, Tailwind CSS, and Recharts.

## Features

- **Authentication**: Mock login system with localStorage
- **Dashboard**: Real-time workflow monitoring with stats and charts
- **Workflows Table**: Paginated table with search, filtering, and sorting
- **Detail Modal**: Comprehensive workflow details with logs and retry functionality
- **Charts**: Interactive charts showing success/failure rates and trends
- **Responsive Design**: Mobile-first design that works on all devices
- **Error Handling**: Graceful error states and loading skeletons

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **JSON Server** - Mock REST API

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Reeshabhrpj/Workflow-Monitoring-Dashboard.git
cd workflow-monitoring-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:

In one terminal, start the mock API:
```bash
npm run server
```

In another terminal, start the React app:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Login Credentials

- **Email**: admin@company.com
- **Password**: admin123

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DashboardCharts.jsx
│   ├── DashboardStats.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── LoadingSkeleton.jsx
│   ├── ProtectedRoute.jsx
│   ├── Sidebar.jsx
│   ├── WorkflowModal.jsx
│   └── WorkflowsTable.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   └── useWorkflows.js
├── pages/              # Page components
│   ├── DashboardPage.jsx
│   └── LoginPage.jsx
├── services/           # API and auth services
│   ├── api.js
│   └── auth.js
├── utils/              # Utility functions
│   └── helpers.js
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── index.css           # Global styles
```

## Key Features

### Dashboard Overview
- Real-time workflow statistics
- Status distribution pie chart
- Workflow runs over time bar chart
- Quick access to recent workflows

### Workflows Management
- Paginated table with 10 items per page
- Search workflows by name
- Filter by status (Success, Failed, Pending)
- Click any row to view detailed information
- Retry failed workflows with optimistic updates

### Workflow Details Modal
- Complete job information and metadata
- Real-time execution logs
- Retry functionality with loading states
- Responsive design for mobile devices

### Authentication
- Mock login system using localStorage
- Protected routes requiring authentication
- User avatar and logout functionality
- Session persistence across browser refreshes

## API Endpoints

The mock API (JSON Server) provides the following endpoints:

- `GET /workflows` - List all workflows with pagination
- `GET /workflows/:id` - Get specific workflow details
- `PUT /workflows/:id` - Update workflow (for retry functionality)

Query parameters supported:
- `_page` - Page number for pagination
- `_limit` - Items per page
- `status` - Filter by workflow status
- `name_like` - Search by workflow name

## Responsive Design

The dashboard is fully responsive and includes:
- Mobile-first design approach
- Collapsible sidebar navigation
- Responsive tables with horizontal scroll
- Touch-friendly buttons and interactions
- Optimized layouts for tablet and desktop

## Error Handling

- Network error states with retry options
- Loading skeletons during data fetching
- Form validation with user feedback
- Graceful degradation for API failures
- Empty states for no data scenarios

## Performance Features

- Debounced search to reduce API calls
- Optimistic updates for better UX
- Lazy loading of workflow details
- Efficient re-rendering with React hooks
- Minimal bundle size with Vite

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON server (mock API)
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## License

MIT License - feel free to use this project for your portfolio or learning purposes.