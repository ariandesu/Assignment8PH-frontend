'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createEvent } from '@/lib/api';
import EventForm from '@/components/events/EventForm';

export default function CreateEventPage() {
  const router = useRouter();

  const handleCreate = async (values) => {
    try {
      await createEvent(values);
      toast.success('Event created successfully!');
      router.push('/events');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="section-title">Create an Event</h1>
        <p className="section-subtitle">Organise a social service event and invite your neighbours to take part.</p>
      </div>
      <EventForm onSubmit={handleCreate} submitLabel="Create Event" submittingLabel="Creating..." />
    </section>
  );
}
