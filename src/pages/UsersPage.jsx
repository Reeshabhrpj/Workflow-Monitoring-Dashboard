import { Users, Plus, Search, Mail, Shield, Calendar } from 'lucide-react';

const UsersPage = () => {
  const users = [
    { id: 1, name: 'Alex Johnson', email: 'alex@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15T14:30:00Z', department: 'Engineering' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@company.com', role: 'Developer', status: 'Active', lastLogin: '2024-01-15T13:45:00Z', department: 'Engineering' },
    { id: 3, name: 'Mike Rodriguez', email: 'mike@company.com', role: 'Developer', status: 'Active', lastLogin: '2024-01-15T12:20:00Z', department: 'Engineering' },
    { id: 4, name: 'Lisa Wang', email: 'lisa@company.com', role: 'Analyst', status: 'Active', lastLogin: '2024-01-15T11:15:00Z', department: 'Operations' },
    { id: 5, name: 'David Kim', email: 'david@company.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-15T10:30:00Z', department: 'Finance' },
    { id: 6, name: 'Emma Thompson', email: 'emma@company.com', role: 'DevOps', status: 'Active', lastLogin: '2024-01-15T09:45:00Z', department: 'Engineering' },
    { id: 7, name: 'James Wilson', email: 'james@company.com', role: 'Developer', status: 'Inactive', lastLogin: '2024-01-10T16:20:00Z', department: 'Engineering' },
    { id: 8, name: 'Rachel Green', email: 'rachel@company.com', role: 'Security', status: 'Active', lastLogin: '2024-01-15T08:30:00Z', department: 'Security' }
  ];

  return (
    <div className="p-6 fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600">User access and permissions</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full max-w-md"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-badge ${user.status === 'Active' ? 'status-success' : 'status-pending'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;