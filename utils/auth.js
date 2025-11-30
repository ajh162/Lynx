// Authentication utilities for CRM system
const AuthUtils = {
  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('crm_token');
    return !!token;
  },

  // Get current user data
  getCurrentUser() {
    const userData = localStorage.getItem('crm_user');
    return userData ? JSON.parse(userData) : null;
  },

  // Login user
  login(credentials) {
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
  },

  // Logout user
  logout() {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    return true;
  },

  // Validate token
  validateToken() {
    const token = localStorage.getItem('crm_token');
    // CORRECCIÓN 1: Simplificamos el flujo a un solo retorno booleano
    return !!token;
  },

  // Get auth headers for API calls
  getAuthHeaders() {
    const token = localStorage.getItem('crm_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

// Export for use in other components
// CORRECCIÓN 2: Usamos globalThis en lugar de window
globalThis.AuthUtils = AuthUtils;
