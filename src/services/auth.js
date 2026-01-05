export const authService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@user.com' && password === 'Demo@123') {
          const user = {
            id: '1',
            name: 'Demo User',
            email: 'demo@user.com',
            role: 'Senior DevOps Engineer',
            department: 'Engineering',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
          };
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', 'mock-jwt-token');
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};