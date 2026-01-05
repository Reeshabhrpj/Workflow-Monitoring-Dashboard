import DashboardStats from '../components/DashboardStats';
import DashboardCharts from '../components/DashboardCharts';
import WorkflowsTable from '../components/WorkflowsTable';

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Stats Cards */}
      <div className="slide-in">
        <DashboardStats />
      </div>
      
      {/* Charts */}
      <div className="slide-in" style={{ animationDelay: '0.1s' }}>
        <DashboardCharts />
      </div>
      
      {/* Workflows Table */}
      <div className="slide-in" style={{ animationDelay: '0.2s' }}>
        <WorkflowsTable />
      </div>
    </div>
  );
};

export default DashboardPage;