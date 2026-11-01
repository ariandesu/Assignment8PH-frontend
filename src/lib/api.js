import { authClient } from './auth-client';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001').replace(/\/$/, '');

// JWT from Better Auth, kept in memory and refreshed shortly before it expires
let cachedToken = null;
let cachedExp = 0;

const decodeExp = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return (payload.exp || 0) * 1000;
  } catch {
    return 0;
  }
};

export const clearToken = () => {
  cachedToken = null;
  cachedExp = 0;
};

export const getToken = async () => {
  if (cachedToken && Date.now() < cachedExp - 60_000) return cachedToken;
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    clearToken();
    return null;
  }
  cachedToken = data.token;
  cachedExp = decodeExp(data.token);
  return cachedToken;
};

export const api = async (endpoint, { auth = false, ...options } = {}) => {
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (auth) {
    const token = await getToken();
    if (!token) {
      const error = new Error('Please log in to continue.');
      error.status = 401;
      throw error;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, { ...options, headers, cache: 'no-store' });
  } catch {
    throw new Error('Could not reach the server. Please check your connection.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) clearToken();
    const error = new Error(data.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// Public
export const getEvents = (params = {}) => {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null));
  const query = new URLSearchParams(clean).toString();
  return api(`/api/events${query ? `?${query}` : ''}`);
};
export const getRecentEvents = () => api('/api/events/recent');
export const getEvent = (id) => api(`/api/events/${id}`);

// Protected (JWT)
export const createEvent = (data) => api('/api/events', { auth: true, method: 'POST', body: JSON.stringify(data) });
export const updateEvent = (id, data) => api(`/api/events/${id}`, { auth: true, method: 'PATCH', body: JSON.stringify(data) });
export const deleteEvent = (id) => api(`/api/events/${id}`, { auth: true, method: 'DELETE' });
export const joinEvent = (id) => api(`/api/events/${id}/join`, { auth: true, method: 'POST' });
export const getJoinStatus = (id) => api(`/api/events/${id}/join-status`, { auth: true });
export const getMyEvents = () => api('/api/my-events', { auth: true });
export const getJoinedEvents = () => api('/api/my-joined-events', { auth: true });
