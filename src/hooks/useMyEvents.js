import { useMyEvents as _useMyEvents, useJoinedEvents as _useJoinedEvents } from '@/hooks/useEvents';

export function useMyEvents() {
  const { events, loading, error, deleteEvent: deleteEventApi } = _useMyEvents ? _useMyEvents() : { events: [], loading: false, error: null, deleteEvent: null };
  return { events: events || [], loading, error, deleteEvent: deleteEventApi };
}

export function useJoinedEvents() {
  const { events, loading, error } = _useJoinedEvents ? _useJoinedEvents() : { events: [], loading: false, error: null };
  return { events: events || [], loading, error };
}
