import { Menu, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Header = ({ onMenuClick, currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const getPageTitle = () => {
    switch(currentPage) {
      case 'dashboard': return 'Dashboard';
      case 'workflows': return 'Workflows';
      case 'users': return 'Users';
      case 'settings': return 'Settings';
      case 'profile': return 'Profile';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:scale-105"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="ml-2 text-lg font-semibold text-gray-800">{getPageTitle()}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-100 relative transition-all duration-200 hover:scale-105">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 fade-in">
              <button 
                onClick={() => {
                  setCurrentPage('profile');
                  setShowProfile(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </button>
              <button 
                onClick={logout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;