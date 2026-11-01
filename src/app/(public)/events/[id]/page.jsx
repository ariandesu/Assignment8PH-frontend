'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, CheckCircle2, Clock, Loader2, MapPin, Tag, User, Users } from 'lucide-react';
import { toast } from 'sonner';
import { getEvent, getJoinStatus, joinEvent } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
import { formatDateTime, isEventExpired } from '@/lib/utils';
import EventImage from '@/components/shared/EventImage';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    getEvent(id)
      .then((data) => setEvent(data.event))
      .catch((err) => setError(err.status === 404 || err.status === 400 ? 'This event could not be found.' : err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user) return setJoined(false);
    getJoinStatus(id)
      .then((data) => setJoined(Boolean(data.joined)))
      .catch(() => {});
  }, [id, user]);

  const handleJoin = async () => {
    if (!user) {
      toast.info('Please log in to join this event.');
      router.push(`/login?callbackUrl=${encodeURIComponent(`/events/${id}`)}`);
      return;
    }
    setJoining(true);
    try {
      await joinEvent(id);
      setJoined(true);
      setEvent((e) => ({ ...e, participantCount: (e.participantCount || 0) + 1 }));
      toast.success('You have joined this event. See you there!');
    } catch (err) {
      if (err.status === 409) setJoined(true);
      toast.error(err.message);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10">
        <LoadingSkeleton className="h-80 lg:h-[460px]" />
        <div className="space-y-4">
          <LoadingSkeleton className="h-6 w-28" />
          <LoadingSkeleton className="h-10 w-3/4" />
          <LoadingSkeleton className="h-4 w-1/2" />
          <LoadingSkeleton className="h-4 w-2/3" />
          <LoadingSkeleton className="h-32 w-full" />
          <LoadingSkeleton className="h-12 w-48" />
        </div>
      </section>
    );
  }

  if (error || !event) {
    return (
      <section className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="section-title">Event Not Found</h1>
        <p className="section-subtitle mx-auto">{error || 'This event could not be found.'}</p>
        <Link href="/events" className="btn-primary inline-block mt-8">Browse Upcoming Events</Link>
      </section>
    );
  }

  const expired = isEventExpired(event.eventDate);
  const isOwner = user && String(user.id) === String(event.creatorId);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-600 dark:text-forest-300 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to events
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <EventImage src={event.image} alt={event.title} className="w-full h-80 lg:h-[460px]" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage dark:bg-forest-500/30 text-forest-600 dark:text-forest-200 text-xs font-semibold uppercase tracking-wide">
            <Tag className="w-3 h-3" /> {event.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-forest-900 dark:text-white mt-4">{event.title}</h1>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <InfoTile icon={Calendar} label="Date & time" value={formatDateTime(event.eventDate)} />
            <InfoTile icon={MapPin} label="Location" value={event.location} />
            <InfoTile icon={User} label="Organised by" value={event.creatorName || event.creatorEmail} />
            <InfoTile icon={Users} label="Volunteers joined" value={String(event.participantCount || 0)} />
          </div>

          <h2 className="font-heading text-lg font-bold text-forest-900 dark:text-white mt-8 mb-2">About this event</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>

          <div className="mt-8">
            {expired ? (
              <p className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 font-medium">
                <Clock className="w-4 h-4" /> This event has already taken place
              </p>
            ) : isOwner ? (
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">You are organising this event.</p>
                <Link href={`/update-event/${event._id}`} className="btn-outline">Edit Event</Link>
              </div>
            ) : joined ? (
              <p className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sage dark:bg-forest-500/30 text-forest-700 dark:text-forest-100 font-semibold">
                <CheckCircle2 className="w-5 h-5" /> You have joined this event
              </p>
            ) : (
              <button
                type="button"
                onClick={handleJoin}
                disabled={joining || sessionLoading}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-70"
              >
                {joining && <Loader2 className="w-4 h-4 animate-spin" />}
                {user || sessionLoading ? 'Join Event' : 'Log in to Join'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="card p-4 flex items-start gap-3">
      <span className="w-9 h-9 rounded-xl bg-sage dark:bg-forest-500/30 text-forest-500 dark:text-forest-200 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-forest-900 dark:text-white break-words">{value}</p>
      </div>
    </div>
  );
}
