'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle2, Clock, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';
import { getJoinedEvents } from '@/lib/api';
import { formatDateTime, isEventExpired } from '@/lib/utils';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import EventImage from '@/components/shared/EventImage';

export default function JoinedEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJoinedEvents()
      .then((data) => setEvents(data.events || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="section-title">Joined Events</h1>
        <p className="section-subtitle">Every event you have signed up for, sorted by event date.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-4 flex gap-4">
              <LoadingSkeleton className="w-36 h-28 shrink-0" />
              <div className="flex-1 space-y-3 py-1">
                <LoadingSkeleton className="h-5 w-2/3" />
                <LoadingSkeleton className="h-3 w-1/2" />
                <LoadingSkeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-semibold text-forest-900 dark:text-white">You haven&rsquo;t joined any events yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse upcoming events and join one that matters to you.</p>
          <Link href="/events" className="btn-primary inline-block mt-6">Browse Events</Link>
        </div>
      ) : (
        <ol className="space-y-4">
          {events.map((event) => {
            const past = isEventExpired(event.eventDate);
            return (
              <li key={event._id} className="card flex flex-col sm:flex-row">
                <EventImage src={event.image} alt={event.title} category={event.category} className="w-full sm:w-48 h-40 sm:h-auto shrink-0" />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-forest-500 dark:text-forest-300">{event.category}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${past ? 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300' : 'bg-sage dark:bg-forest-500/30 text-forest-700 dark:text-forest-100'}`}>
                      {past ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />} {past ? 'Completed' : 'Going'}
                    </span>
                  </div>
                  <h2 className="font-heading text-lg font-bold text-forest-900 dark:text-white">{event.title}</h2>
                  <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 shrink-0" /> {formatDateTime(event.eventDate)}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> {event.location}</p>
                    <p className="flex items-center gap-2 sm:col-span-2"><User className="w-4 h-4 shrink-0" /> Organised by {event.creatorName || event.creatorEmail}</p>
                  </div>
                  <Link href={`/events/${event._id}`} className="mt-4 self-start text-sm font-semibold text-forest-600 dark:text-forest-300 hover:underline">
                    View event details →
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
