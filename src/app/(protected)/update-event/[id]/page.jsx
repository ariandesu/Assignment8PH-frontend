'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { getEvent, updateEvent } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
import EventForm from '@/components/events/EventForm';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function UpdateEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getEvent(id)
      .then((data) => setEvent(data.event))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleUpdate = async (values) => {
    try {
      await updateEvent(id, values);
      toast.success('Event updated successfully!');
      router.push('/manage-events');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const notOwner = event && session?.user && String(event.creatorId) !== String(session.user.id);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/manage-events" className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-600 dark:text-forest-300 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Manage Events
      </Link>
      <div className="mb-8">
        <h1 className="section-title">Update Event</h1>
        <p className="section-subtitle">Change the details volunteers see for this event.</p>
      </div>

      {error ? (
        <p className="card p-8 text-center text-gray-600 dark:text-gray-400">{error}</p>
      ) : notOwner ? (
        <p className="card p-8 text-center text-gray-600 dark:text-gray-400">You can only update events you created.</p>
      ) : !event ? (
        <div className="card p-8 space-y-5">
          {[1, 2, 3, 4, 5].map((i) => <LoadingSkeleton key={i} className="h-12" />)}
        </div>
      ) : (
        <EventForm initialValues={event} onSubmit={handleUpdate} submitLabel="Save Changes" submittingLabel="Saving..." />
      )}
    </section>
  );
}
