const API_BASE = 'http://localhost:3001';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const simulateError = () => Math.random() < 0.1; // 10% chance of error

export const apiService = {
  getWorkflows: async (page = 1, limit = 10, status = '', search = '') => {
    await delay(800); // Simulate loading
    
    if (simulateError()) {
      throw new Error('Failed to fetch workflows');
    }

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
    await delay(500);
    
    if (simulateError()) {
      throw new Error('Failed to fetch workflow details');
    }

    const response = await fetch(`${API_BASE}/workflows/${id}`);
    if (!response.ok) throw new Error('Workflow not found');
    
    return response.json();
  },

  retryWorkflow: async (id) => {
    await delay(1000);
    
    // Optimistically update status
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