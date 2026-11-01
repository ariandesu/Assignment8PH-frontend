'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarX } from 'lucide-react';
import { getRecentEvents } from '@/lib/api';
import EventCard from '@/components/events/EventCard';
import { EventGridSkeleton } from '@/components/shared/LoadingSkeleton';

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecentEvents()
      .then((data) => setEvents(data.events || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange mb-2">Coming Up</p>
            <h2 className="section-title">Recent Upcoming Events</h2>
            <p className="section-subtitle">The next six community events happening near you.</p>
          </div>
          <Link href="/events" className="btn-outline inline-flex items-center gap-2 self-start sm:self-auto">
            See All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <p className="text-center py-12 text-gray-500 dark:text-gray-400">{error}</p>
        ) : events.length === 0 ? (
          <div className="card p-12 text-center">
            <CalendarX className="w-10 h-10 mx-auto text-forest-500/60 mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No upcoming events yet. Be the first to organise one!</p>
            <Link href="/create-event" className="btn-primary inline-block mt-5">Create an Event</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
