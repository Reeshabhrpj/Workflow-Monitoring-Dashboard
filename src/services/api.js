const API_BASE = 'http://localhost:3001';
const IS_PRODUCTION = import.meta.env.PROD;

// Mock data for production
const MOCK_WORKFLOWS = [
  {
    "id": "wf-001",
    "name": "User Data Pipeline",
    "status": "success",
    "lastRun": "2024-01-15T14:30:00Z",
    "duration": 245,
    "priority": "high",
    "owner": "Sarah Chen",
    "logs": [
      "2024-01-15T14:30:00Z [INFO] Starting user data pipeline",
      "2024-01-15T14:30:15Z [INFO] Connecting to database cluster",
      "2024-01-15T14:34:05Z [SUCCESS] Pipeline completed successfully"
    ]
  },
  {
    "id": "wf-002",
    "name": "Email Campaign Processor",
    "status": "failed",
    "lastRun": "2024-01-15T13:45:00Z",
    "duration": 120,
    "priority": "medium",
    "owner": "Mike Rodriguez",
    "logs": [
      "2024-01-15T13:45:00Z [INFO] Starting email campaign processor",
      "2024-01-15T13:47:00Z [ERROR] SMTP connection timeout",
      "2024-01-15T13:47:00Z [FAILED] Pipeline failed with errors"
    ]
  },
  {
    "id": "wf-003",
    "name": "ML Model Training",
    "status": "running",
    "lastRun": "2024-01-15T16:00:00Z",
    "duration": 3600,
    "priority": "high",
    "owner": "Dr. Amanda Foster",
    "logs": [
      "2024-01-15T16:00:00Z [INFO] Starting ML model training",
      "2024-01-15T16:45:00Z [INFO] Training in progress - Epoch 5/10"
    ]
  },
  {
    "id": "wf-004",
    "name": "Database Backup",
    "status": "success",
    "lastRun": "2024-01-15T02:00:00Z",
    "duration": 1800,
    "priority": "critical",
    "owner": "Alex Johnson",
    "logs": [
      "2024-01-15T02:00:00Z [INFO] Starting database backup",
      "2024-01-15T02:30:00Z [SUCCESS] Backup completed successfully"
    ]
  },
  {
    "id": "wf-005",
    "name": "API Health Check",
    "status": "failed",
    "lastRun": "2024-01-15T14:15:00Z",
    "duration": 30,
    "priority": "high",
    "owner": "Emma Thompson",
    "logs": [
      "2024-01-15T14:15:00Z [INFO] Starting API health check",
      "2024-01-15T14:15:30Z [ERROR] Authentication service unreachable"
    ]
  },
  {
    "id": "wf-006",
    "name": "Security Scan",
    "status": "success",
    "lastRun": "2024-01-15T11:30:00Z",
    "duration": 420,
    "priority": "critical",
    "owner": "Rachel Green",
    "logs": [
      "2024-01-15T11:30:00Z [INFO] Starting security scan",
      "2024-01-15T11:37:00Z [SUCCESS] No critical vulnerabilities found"
    ]
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  getWorkflows: async (page = 1, limit = 10, status = '', search = '') => {
    await delay(500);
    
    if (IS_PRODUCTION) {
      // Use mock data in production
      let filteredWorkflows = [...MOCK_WORKFLOWS];
      
      if (status) {
        filteredWorkflows = filteredWorkflows.filter(wf => wf.status === status);
      }
      
      if (search) {
        filteredWorkflows = filteredWorkflows.filter(wf => 
          wf.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredWorkflows.slice(startIndex, endIndex);
      
      return {
        data: paginatedData,
        total: filteredWorkflows.length,
        page,
        limit
      };
    }
    
    // Development mode - use JSON server
    let url = `${API_BASE}/workflows?_page=${page}&_limit=${limit}`;
    if (status) url += `&status=${status}`;
    if (search) url += `&name_like=${search}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    
    const data = await response.json();
    const total = parseInt(response.headers.get('X-Total-Count') || '0');
    
    return { data, total, page, limit };
  },

  getWorkflow: async (id) => {
    await delay(300);
    
    if (IS_PRODUCTION) {
      const workflow = MOCK_WORKFLOWS.find(wf => wf.id === id);
      if (!workflow) throw new Error('Workflow not found');
      return workflow;
    }
    
    const response = await fetch(`${API_BASE}/workflows/${id}`);
    if (!response.ok) throw new Error('Workflow not found');
    
    return response.json();
  },

  retryWorkflow: async (id) => {
    await delay(800);
    
    if (IS_PRODUCTION) {
      // Simulate retry in production
      const workflowIndex = MOCK_WORKFLOWS.findIndex(wf => wf.id === id);
      if (workflowIndex !== -1) {
        MOCK_WORKFLOWS[workflowIndex] = {
          ...MOCK_WORKFLOWS[workflowIndex],
          status: 'pending',
          lastRun: new Date().toISOString()
        };
        return MOCK_WORKFLOWS[workflowIndex];
      }
      throw new Error('Workflow not found');
    }
    
    const workflow = await apiService.getWorkflow(id);
    const updatedWorkflow = {
      ...workflow,
      status: 'pending',
      lastRun: new Date().toISOString()
    };

    const response = await fetch(`${API_BASE}/workflows/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWorkflow)
    });

    if (!response.ok) throw new Error('Failed to retry workflow');
    return response.json();
  }
};