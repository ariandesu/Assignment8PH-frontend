'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CalendarX, ChevronLeft, ChevronRight } from 'lucide-react';
import { getEvents } from '@/lib/api';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import { EventGridSkeleton } from '@/components/shared/LoadingSkeleton';

const PAGE_SIZE = 9;

function EventsList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = {
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    page: Math.max(parseInt(searchParams.get('page') || '1', 10) || 1, 1),
  };

  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const updateQuery = useCallback(
    (changes) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(changes).forEach(([k, v]) => (v ? params.set(k, v) : params.delete(k)));
      if (!('page' in changes)) params.delete('page');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    getEvents({
      search: values.search,
      location: values.location,
      category: values.category,
      page: values.page,
      limit: PAGE_SIZE,
    })
      .then((data) => {
        if (cancelled) return;
        setEvents(data.events || []);
        setPagination(data.pagination || { pages: 1, total: 0 });
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [values.search, values.location, values.category, values.page]);

  return (
    <>
      <EventFilters values={values} onChange={updateQuery} />

      <div className="mt-10">
        {loading ? (
          <EventGridSkeleton count={6} />
        ) : error ? (
          <p className="text-center py-12 text-gray-500 dark:text-gray-400">{error}</p>
        ) : events.length === 0 ? (
          <div className="card p-12 text-center">
            <CalendarX className="w-10 h-10 mx-auto text-forest-500/60 mb-3" />
            <p className="text-lg font-semibold text-forest-900 dark:text-white">No upcoming events found</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try a different search or event type.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {pagination.total} upcoming event{pagination.total === 1 ? '' : 's'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            {pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  type="button"
                  disabled={values.page <= 1}
                  onClick={() => updateQuery({ page: String(values.page - 1) })}
                  className="btn-outline !px-4 !py-2 disabled:opacity-40 inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Page {values.page} of {pagination.pages}
                </span>
                <button
                  type="button"
                  disabled={values.page >= pagination.pages}
                  onClick={() => updateQuery({ page: String(values.page + 1) })}
                  className="btn-outline !px-4 !py-2 disabled:opacity-40 inline-flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default function EventsPage() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange mb-2">Upcoming Events</p>
          <h1 className="section-title">Find a Cause Near You</h1>
          <p className="section-subtitle mx-auto">Every event below is still to come. Pick one, show up, and make a difference.</p>
        </div>
        <Suspense fallback={<EventGridSkeleton count={6} />}>
          <EventsList />
        </Suspense>
      </div>
    </section>
  );
}
