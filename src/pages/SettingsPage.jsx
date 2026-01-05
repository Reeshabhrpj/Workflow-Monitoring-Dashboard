import { Bell, Shield, Database, Mail } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="p-6 fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">System configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Workflow failures</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Weekly reports</span>
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Security</h3>
          </div>
          <div className="space-y-4">
            <button className="btn-secondary w-full text-left">Change Password</button>
            <button className="btn-secondary w-full text-left">Two-Factor Authentication</button>
            <button className="btn-secondary w-full text-left">API Keys</button>
          </div>
        </div>

        {/* Database */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold">Database</h3>
          </div>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Last backup: 2 hours ago</p>
              <p>Storage used: 2.4 GB</p>
            </div>
            <button className="btn-primary">Backup Now</button>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold">Integrations</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Slack</span>
              <span className="status-badge status-success">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email</span>
              <span className="status-badge status-success">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Teams</span>
              <span className="status-badge status-pending">Disconnected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;