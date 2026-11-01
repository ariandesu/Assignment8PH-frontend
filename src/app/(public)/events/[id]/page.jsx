'use client';

export const dynamic = 'force-dynamic';

import { getEvent, joinEvent } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, User, ShieldAlert } from 'lucide-react';
import { formatDate, formatDateTime, isEventExpired } from '@/lib/utils';

export default async function EventDetailsPage({ params }) {
  const { id } = params;
  let eventData = null;
  let error = null;
  let loading = true;

  try {
    const data = await getEvent(id);
    eventData = data.event;
    loading = false;
  } catch (err) {
    error = err.message;
    loading = false;
  }

  const [joined, setJoined] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      const session = await authClient.getSession();
      setSession(session);
    };
    loadSession();
  }, []);

  useEffect(() => {
    const checkJoin = async () => {
      if (!session?.user) return;
      try {
        // Check if user already joined (we'll attempt join and handle 409)
      } catch {}
    };
    checkJoin();
  }, [session]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col h-[600px]">
            <div className="h-64 bg-sage dark:bg-[#1f2d26] animate-pulse rounded-2xl mb-6" />
            <div className="h-4 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded w-1/3 mb-3" />
            <div className="h-4 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded w-2/3 mb-6" />
            <div className="h-24 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !eventData) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center py-16">
          <h2 className="text-2xl font-bold text-forest-900 dark:text-white mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error || 'The event you are looking for does not exist.'}</p>
          <a href="/events" className="mt-6 inline-block btn-primary">
            Browse Events
          </a>
        </div>
      </section>
    );
  }

  const isExpired = isEventExpired(eventData.eventDate);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="relative h-80 rounded-2xl overflow-hidden border border-sage/50">
              <Image
                src={eventData.image}
                alt={eventData.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 dark:bg-[#16221c]/90 backdrop-blur border border-white/50">
                <span className="text-xs font-medium text-forest-700 dark:text-forest-200 uppercase">
                  {eventData.category}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formatDateTime(eventData.eventDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{eventData.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-forest-500" />
                <h2 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">
                  {eventData.title}
                </h2>
              </div>
              <p className="text-xs font-medium text-forest-600 dark:text-forest-400 uppercase tracking-wider mb-4">
                Organized by {eventData.creatorEmail}
              </p>
              <div className="bg-white dark:bg-[#16221c] border border-sage/50 rounded-2xl p-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {eventData.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#16221c] border border-sage/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-forest-500" />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Volunteers
                  </span>
                </div>
                <p className="text-xl font-bold text-forest-900 dark:text-white">
                  {eventData.participantCount || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-[#16221c] border border-sage/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldAlert className="w-5 h-5 text-forest-500" />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </span>
                </div>
                <p className={`text-sm font-medium ${isExpired ? 'text-red-500' : 'text-forest-600 dark:text-forest-400'}`}>
                  {isExpired ? 'Expired' : 'Upcoming'}
                </p>
              </div>
            </div>

            {session?.user ? (
              <button
                onClick={async () => {
                  try {
                    await joinEvent(id);
                    setJoined(true);
                  } catch (err) {
                    if (err.status === 409) {
                      setJoined(true);
                      alert('You have already joined this event.');
                    } else if (err.status === 400) {
                      alert('Cannot join an expired event.');
                    } else {
                      alert('Failed to join event. Please try again.');
                    }
                  }
                }}
                disabled={joined || isExpired}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                  joined || isExpired
                    ? 'bg-gray-300 dark:bg-[#304035] text-gray-500 dark:text-gray-400'
                    : 'bg-forest-500 text-white hover:bg-forest-600'
                }`}
              >
                {joined ? 'Joined' : isExpired ? 'Event Expired' : 'Join Event'}
              </button>
            ) : (
              <button
                onClick={() => {
                  const callbackUrl = encodeURIComponent(`/events/${id}`);
                  window.location.href = `/login?callbackUrl=${callbackUrl}`;
                }}
                className="w-full py-4 rounded-xl font-semibold bg-forest-500 text-white hover:bg-forest-600 transition-all flex items-center justify-center gap-2"
              >
                <span>Join Event</span>
              </button>
            )}

            {session?.user && joined && (
              <p className="text-sm text-forest-600 dark:text-forest-400 flex items-center gap-2">
                ✅ You are registered for this event
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
