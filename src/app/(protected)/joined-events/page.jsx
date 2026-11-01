'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useJoinedEvents } from '@/hooks/useEvents';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, User, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function JoinedEventsPage() {
  const { events: joinedEvents, loading, error } = useJoinedEvents();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-bold text-forest-900 dark:text-white mb-6">
            My Joined Events
          </h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <LoadingSkeleton className="w-48 h-48" />
                <div className="flex-1">
                  <LoadingSkeleton className="h-4 w-3/4 mb-3" />
                  <LoadingSkeleton className="h-3 w-full mb-2" />
                  <LoadingSkeleton className="h-3 w-1/2 mb-2" />
                  <LoadingSkeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">
            My Joined Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            All the events you have joined, sorted by event date.
          </p>
        </div>

        {joinedEvents.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#16221c] rounded-2xl border border-sage/50">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1f2d26] flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No joined events</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
              You haven&rsquo;t joined any events yet. Browse upcoming events and join initiatives that matter to you.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {joinedEvents.map((event) => (
              <div key={event._id} className="card flex flex-col md:flex-row gap-4 p-5">
                <div className="relative h-32 md:h-auto md:w-48 overflow-hidden rounded-xl shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 150px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white mb-1 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-xs font-medium text-forest-600 dark:text-forest-400 uppercase tracking-wider mb-3">
                        {event.category}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>
                        <strong className="text-gray-900 dark:text-white">Date:</strong> {formatDate(event.eventDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="line-clamp-1">
                        <strong className="text-gray-900 dark:text-white">Location:</strong> {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>
                        <strong className="text-gray-900 dark:text-white">Organizer:</strong> {event.creatorEmail}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-forest-100 dark:bg-[#1f2d26]/30 text-forest-700 dark:text-forest-300 text-xs font-medium">
                        Confirmed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
