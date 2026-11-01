'use client';

export const dynamic = 'force-dynamic';

// Upcoming events listing page with search, category, location filters and pagination

import { getEvents } from '@/lib/api';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import EventGrid from '@/components/events/EventGrid';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default async function EventsPage({ searchParams }) {
  const search = searchParams?.search || '';
  const category = searchParams?.category || '';
  const location = searchParams?.location || '';
  const sort = searchParams?.sort || 'eventDate';

  let events = [];
  let error = null;
  let loading = true;

  try {
    const data = await getEvents({ search, category, location, sort });
    events = data.events || [];
    loading = false;
  } catch (err) {
    error = err.message;
    loading = false;
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-forest-900 dark:text-white mb-4">
            Discover Community Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find social development events near you and take part in making
            your community stronger.
          </p>
        </div>

        <EventFilters
          search={search}
          category={category}
          location={location}
          sort={sort}
        />

        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i}>
                  <LoadingSkeleton className="h-[420px]" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Failed to load events: {error}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">No events found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <EventGrid events={events} />
          )}
        </div>
      </div>
    </section>
  );
}
