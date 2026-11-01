export const EVENT_CATEGORIES = ['Cleanup', 'Plantation', 'Donation', 'Blood Donation', 'Education', 'Health', 'Other'];

export const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export const formatDateTime = (value) =>
  new Date(value).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

export const isEventExpired = (eventDate) => new Date(eventDate) <= new Date();

// Value for <input type="datetime-local"> in the user's local time
export const toDateTimeLocal = (value) => {
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Only allow same-site relative paths as post-login redirects
export const safeCallbackUrl = (value, fallback = '/') =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : fallback;
