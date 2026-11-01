'use client';

export const dynamic = 'force-dynamic';

// Manage events page with edit and delete functionality for user-created events

import { useEffect, useState } from 'react';
import { useMyEvents } from '@/hooks/useEvents';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Edit2, Trash2, Calendar, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ManageEventsPage() {
  const { events: myEvents, loading, error, deleteEvent: deleteEventApi } = useMyEvents();
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await deleteEventApi(id);
      toast.success('Event deleted successfully.');
      setEventToDelete(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete event');
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-bold text-forest-900 dark:text-white mb-6">
            Manage My Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <LoadingSkeleton className="h-[320px]" />
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">
              Manage My Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View, update, or delete events you&rsquo;ve created.
            </p>
          </div>
        </div>

        {myEvents.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#16221c] rounded-2xl border border-sage/50">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1f2d26] flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
              You haven&rsquo;t created any events. Start by creating your first initiative.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <div key={event._id} className="card h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 dark:bg-[#16221c]/90 backdrop-blur text-xs font-medium text-forest-700 dark:text-forest-200">
                    {event.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white mb-1 line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(event.eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>
                      <Users className="w-3 h-3 fill-current" />
                      {event.participantCount || 0} joined
                    </span>
                    <span className={`text-xs font-semibold uppercase ${event.eventDate > new Date() ? 'text-forest-600 dark:text-forest-400' : 'text-gray-400'}`}>
                      {event.eventDate > new Date() ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => {
                        // Navigate to edit - for now just show toast
                        toast.info('Edit functionality coming soon');
                      }}
                      className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => setEventToDelete(event._id)}
                      className="w-auto px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          open={!!eventToDelete}
          onConfirm={() => {
            if (eventToDelete) handleDelete(eventToDelete);
          }}
          onCancel={() => setEventToDelete(null)}
          title="Delete Event"
          description="Are you sure you want to delete this event? This cannot be undone."
          confirmText="Delete Event"
        />
      </div>
    </section>
  );
}
