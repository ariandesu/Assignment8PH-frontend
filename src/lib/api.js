const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const getToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    const token = localStorage.getItem('kindora_token');
    return token;
  } catch {
    return null;
  }
};

const setToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('kindora_token', token);
};

const removeToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('kindora_token');
};

export const api = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login?callbackUrl=' + encodeURIComponent(window.location.pathname);
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'API error');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const getEvents = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api(`/api/events${query ? '?' + query : ''}`);
};

export const getRecentEvents = () => api('/api/events/recent');
export const getEvent = (id) => api(`/api/events/${id}`);
export const createEvent = (data) => api('/api/events', { method: 'POST', body: JSON.stringify(data) });
export const updateEvent = (id, data) => api(`/api/events/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteEvent = (id) => api(`/api/events/${id}`, { method: 'DELETE' });
export const joinEvent = (id) => api(`/api/events/${id}/join`, { method: 'POST' });
export const getMyEvents = () => api('/api/my-events');
export const getJoinedEvents = () => api('/api/my-joined-events');
export const getProfile = () => api('/api/users/me');
export const updateProfile = (data) => api('/api/users/me', { method: 'PATCH', body: JSON.stringify(data) });

export { setToken, removeToken, getToken };
