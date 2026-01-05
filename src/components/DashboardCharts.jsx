import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const DashboardCharts = () => {
  const [statusData, setStatusData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const result = await apiService.getWorkflows(1, 100); // Get all workflows
      const workflows = result.data;

      // Status distribution
      const statusCounts = workflows.reduce((acc, wf) => {
        acc[wf.status] = (acc[wf.status] || 0) + 1;
        return acc;
      }, {});

      const statusChartData = [
        { name: 'Success', value: statusCounts.success || 0, color: '#10b981' },
        { name: 'Failed', value: statusCounts.failed || 0, color: '#ef4444' },
        { name: 'Pending', value: statusCounts.pending || 0, color: '#f59e0b' }
      ];

      // Time series data (mock - group by hour)
      const timeSeriesData = [
        { time: '00:00', success: 12, failed: 2, pending: 1 },
        { time: '04:00', success: 8, failed: 1, pending: 2 },
        { time: '08:00', success: 15, failed: 3, pending: 0 },
        { time: '12:00', success: 20, failed: 1, pending: 1 },
        { time: '16:00', success: 18, failed: 2, pending: 3 },
        { time: '20:00', success: 10, failed: 1, pending: 2 }
      ];

      setStatusData(statusChartData);
      setTimeData(timeSeriesData);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Runs Over Time */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Runs Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="success" stackId="a" fill="#10b981" name="Success" />
            <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" />
            <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;