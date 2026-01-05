import { useState, useEffect } from 'react';
import { authService } from '../services/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    window.location.reload();
    return userData;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.reload();
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
};