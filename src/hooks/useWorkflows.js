import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { debounce } from '../utils/helpers';

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const limit = 10;

  const fetchWorkflows = async (currentPage = page, status = statusFilter, search = searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getWorkflows(currentPage, limit, status, search);
      setWorkflows(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = debounce(fetchWorkflows, 300);

  useEffect(() => {
    fetchWorkflows();
  }, [page, statusFilter]);

  useEffect(() => {
    if (searchQuery !== '') {
      setPage(1);
      debouncedFetch(1, statusFilter, searchQuery);
    } else {
      fetchWorkflows(1, statusFilter, '');
    }
  }, [searchQuery]);

  const retryWorkflow = async (id) => {
    try {
      await apiService.retryWorkflow(id);
      // Update local state optimistically
      setWorkflows(prev => prev.map(wf => 
        wf.id === id ? { ...wf, status: 'pending' } : wf
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    workflows,
    loading,
    error,
    page,
    total,
    limit,
    statusFilter,
    searchQuery,
    setPage,
    setStatusFilter,
    setSearchQuery,
    retryWorkflow,
    refetch: fetchWorkflows
  };
};