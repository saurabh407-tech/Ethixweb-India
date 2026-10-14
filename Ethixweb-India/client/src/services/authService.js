import apiRequest from './api.js';

const TOKEN_KEY = 'ethixweb_admin_token';
const ADMIN_KEY = 'ethixweb_admin_profile';

export const authService = {
  async login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    if (data.admin) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    }

    return data;
  },

  async logout() {
    try {
      // Call server to clear the HttpOnly cookie
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_KEY);
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser() {
    const raw = localStorage.getItem(ADMIN_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(ADMIN_KEY) || localStorage.getItem(TOKEN_KEY));
  },

  async verifyAuth() {
    try {
      const data = await apiRequest('/auth/me');
      if (data.admin) {
        localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
      }
      return data;
    } catch (err) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_KEY);
      throw err;
    }
  },
};

export default authService;
