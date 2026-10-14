const isClientProduction =
  typeof window !== 'undefined' &&
  !['localhost', '127.0.0.1'].includes(window.location.hostname);

let configuredUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();

// When running on a live domain (like *.vercel.app) and no remote URL is provided (or mistakenly pointing to localhost), fallback to live Render backend
if (isClientProduction && (!configuredUrl || configuredUrl.includes('localhost') || configuredUrl.includes('127.0.0.1'))) {
  configuredUrl = 'https://ethixweb-india-api.onrender.com/api';
} else if (!configuredUrl) {
  configuredUrl = 'http://localhost:5000/api';
}

let rawBaseUrl = configuredUrl;
if (!rawBaseUrl.endsWith('/api') && !rawBaseUrl.endsWith('/api/')) {
  rawBaseUrl = `${rawBaseUrl.replace(/\/+$/, '')}/api`;
}
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

/**
 * Universal fetch wrapper for Ethixweb client
 * Supports HttpOnly cookies (credentials: 'include') and Bearer token fallback
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('ethixweb_admin_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    credentials: 'include', // Automatically passes HttpOnly JWT cookie
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export default apiRequest;
