'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Pencil, PlusCircle, Trash2, Users, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { deleteEvent, getMyEvents } from '@/lib/api';
import { formatDate, isEventExpired } from '@/lib/utils';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EventGridSkeleton } from '@/components/shared/LoadingSkeleton';
import EventImage from '@/components/shared/EventImage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getMyEvents()
      .then((data) => setEvents(data.events || []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteEvent(toDelete._id);
      setEvents((list) => list.filter((e) => e._id !== toDelete._id));
      toast.success('Event deleted successfully.');
      setToDelete(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="section-title">Manage Events</h1>
          <p className="section-subtitle">Update or delete the events you have created.</p>
        </div>
        <Button asChild className="self-start">
          <Link href="/create-event">
            <PlusCircle className="w-4 h-4" /> New Event
          </Link>
        </Button>
      </div>

      {loading ? (
        <EventGridSkeleton count={3} />
      ) : events.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-semibold text-forest-900 dark:text-white">You haven&rsquo;t created any events yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Start your first initiative and invite volunteers to join.</p>
          <Link href="/create-event" className="btn-primary inline-block mt-6">Create an Event</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const past = isEventExpired(event.eventDate);
            return (
              <Card asChild key={event._id} className="h-full flex flex-col">
              <article>
                <div className="relative h-44">
                  <EventImage src={event.image} alt={event.title} category={event.category} className="w-full h-full" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${past ? 'bg-gray-800/80 text-white' : 'bg-orange text-forest-900'}`}>
                    {past ? 'Past' : 'Upcoming'}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wide text-forest-500 dark:text-forest-300">{event.category}</p>
                  <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white mt-1 mb-3 line-clamp-2 min-h-[3.5rem]">{event.title}</h3>
                  <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-5">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 shrink-0" /> {formatDate(event.eventDate)}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> <span className="line-clamp-1">{event.location}</span></p>
                    <p className="flex items-center gap-2"><Users className="w-4 h-4 shrink-0" /> {event.participantCount || 0} joined</p>
                  </div>
                  <div className="mt-auto grid grid-cols-3 gap-2">
                    <Button asChild variant="secondary" size="sm" className="gap-1 px-2 font-medium">
                      <Link href={`/events/${event._id}`}>
                        <Eye className="w-4 h-4" /> View
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="gap-1 px-2 font-medium">
                      <Link href={`/update-event/${event._id}`}>
                        <Pencil className="w-4 h-4" /> Update
                      </Link>
                    </Button>
                    <Button type="button" variant="destructive" size="sm" onClick={() => setToDelete(event)} className="gap-1 px-2 font-medium">
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </div>
                </div>
              </article>
              </Card>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setToDelete(null)}
        title="Delete this event?"
        description={`"${toDelete?.title || ''}" and its volunteer list will be removed permanently.`}
        confirmText="Delete Event"
      />
    </section>
  );
}
