import { useState, useEffect } from 'react';
import { X, RefreshCw, Clock, Calendar, User, AlertTriangle } from 'lucide-react';
import { apiService } from '../services/api';
import { formatDate, formatDuration, getStatusColor, getPriorityColor } from '../utils/helpers';

const WorkflowModal = ({ workflowId, isOpen, onClose, onRetry }) => {
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (isOpen && workflowId) {
      fetchWorkflow();
    }
  }, [isOpen, workflowId]);

  const fetchWorkflow = async () => {
    setLoading(true);
    try {
      const data = await apiService.getWorkflow(workflowId);
      setWorkflow(data);
    } catch (error) {
      console.error('Failed to fetch workflow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await onRetry(workflowId);
      setWorkflow(prev => ({ ...prev, status: 'pending' }));
    } catch (error) {
      console.error('Failed to retry workflow:', error);
    } finally {
      setRetrying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {workflow?.name || 'Workflow Details'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : workflow ? (
            <div className="space-y-6">
              {/* Workflow Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Job ID</label>
                    <p className="text-sm text-gray-900 font-mono">{workflow.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <span className={`status-badge ${getStatusColor(workflow.status)}`}>
                        {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Priority</label>
                    <div className="mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workflow.priority)}`}>
                        {workflow.priority?.charAt(0).toUpperCase() + workflow.priority?.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Owner</label>
                    <div className="flex items-center mt-1 text-sm text-gray-900">
                      <User className="h-4 w-4 mr-2" />
                      {workflow.owner}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Run</label>
                    <div className="flex items-center mt-1 text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(workflow.lastRun)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Duration</label>
                    <div className="flex items-center mt-1 text-sm text-gray-900">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatDuration(workflow.duration)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={handleRetry}
                  disabled={retrying || workflow.status === 'pending' || workflow.status === 'running'}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${retrying ? 'animate-spin' : ''}`} />
                  {retrying ? 'Retrying...' : 'Retry Workflow'}
                </button>
                {workflow.status === 'failed' && (
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Workflow failed - check logs for details
                  </div>
                )}
              </div>

              {/* Logs */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Execution Logs</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto max-h-64 overflow-y-auto">
                  {workflow.logs?.map((log, index) => (
                    <div key={index} className={`mb-1 ${
                      log.includes('[ERROR]') ? 'text-red-400' :
                      log.includes('[WARNING]') ? 'text-yellow-400' :
                      log.includes('[SUCCESS]') ? 'text-green-400' :
                      'text-gray-300'
                    }`}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Failed to load workflow details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowModal;