// Authentication utilities for CRM system
const AuthUtils = {
  // Check if user is authenticated
  isAuthenticated() {
    try {
      const token = localStorage.getItem('crm_token');
      return !!token;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },

  // Get current user data
  getCurrentUser() {
    try {
      const userData = localStorage.getItem('crm_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },

  // Login user
  login(credentials) {
    try {
      // Demo authentication - in real app, this would call an API
      if (credentials.email === 'admin@crm.com' && credentials.password === 'admin123') {
        const token = 'mock_token_' + Date.now();
        const userData = {
          id: 1,
          name: 'Admin User',
          email: 'admin@crm.com',
          role: 'administrator'
        };
        
        localStorage.setItem('crm_token', token);
        localStorage.setItem('crm_user', JSON.stringify(userData));
        return { success: true, user: userData, token };
      }
      return { success: false, message: 'Credenciales inválidas' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error en el proceso de login' };
    }
  },

  // Logout user
  logout() {
    try {
      localStorage.removeItem('crm_token');
      localStorage.removeItem('crm_user');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  },

  // Validate token
  validateToken() {
    try {
      const token = localStorage.getItem('crm_token');
      if (!token) return false;
      
      // In a real app, you would validate the token with the server
      // For demo purposes, we just check if it exists and is not expired
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  // Get auth headers for API calls
  getAuthHeaders() {
    try {
      const token = localStorage.getItem('crm_token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    } catch (error) {
      console.error('Get auth headers error:', error);
      return {};
    }
  }
};

// Export for use in other components
window.AuthUtils = AuthUtils;
