import { useState, useEffect, useCallback } from 'react';
import {
  getEvents,
  getRecentEvents,
  getEvent,
  createEvent as apiCreateEvent,
  updateEvent as apiUpdateEvent,
  deleteEvent as apiDeleteEvent,
  joinEvent as apiJoinEvent,
  getMyEvents as apiGetMyEvents,
  getJoinedEvents as apiGetJoinedEvents,
} from '../lib/api';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const data = await getEvents(params);
      setEvents(data.events || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecentEvents = useCallback(async () => {
    try {
      const data = await getRecentEvents();
      setRecentEvents(data.events || []);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchEvent = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await getEvent(id);
      setEvent(data.event);
      return data.event;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (eventData) => {
    try {
      const data = await apiCreateEvent(eventData);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateEventAction = useCallback(async (id, eventData) => {
    try {
      const data = await apiUpdateEvent(id, eventData);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteEventAction = useCallback(async (id) => {
    try {
      await apiDeleteEvent(id);
    } catch (err) {
      throw err;
    }
  }, []);

  const joinEventAction = useCallback(async (id) => {
    try {
      const data = await apiJoinEvent(id);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const fetchMyEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGetMyEvents();
      setEvents(data.events || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJoinedEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGetJoinedEvents();
      setEvents(data.events || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    events,
    recentEvents,
    event,
    loading,
    error,
    fetchEvents,
    fetchRecentEvents,
    fetchEvent,
    createEvent,
    updateEvent: updateEventAction,
    deleteEvent: deleteEventAction,
    joinEvent: joinEventAction,
    fetchMyEvents,
    fetchJoinedEvents,
  };
};

// Separate hooks for my-events and joined-events pages
export function useMyEvents() {
  const { events, loading, error, fetchMyEvents, deleteEvent: deleteEventApi } = useEvents();

  // Fetch on mount
  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  return {
    events,
    loading,
    error,
    deleteEvent: deleteEventApi,
  };
}

export function useJoinedEvents() {
  const { events, loading, error, fetchJoinedEvents } = useEvents();

  useEffect(() => {
    fetchJoinedEvents();
  }, [fetchJoinedEvents]);

  return {
    events,
    loading,
    error,
  };
}
