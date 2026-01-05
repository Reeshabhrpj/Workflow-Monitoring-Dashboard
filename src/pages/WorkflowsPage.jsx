import WorkflowsTable from '../components/WorkflowsTable';

const WorkflowsPage = () => {
  return (
    <div className="p-6 fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
        <p className="text-gray-600">View and control your automated processes</p>
      </div>
      <WorkflowsTable />
    </div>
  );
};

export default WorkflowsPage;