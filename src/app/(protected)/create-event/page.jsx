'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createEvent as apiCreateEvent } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  image: z.string().min(1, 'Image URL is required').url('Invalid image URL'),
  location: z.string().min(3, 'Location is required'),
  eventDate: z.string().min(1, 'Event date is required'),
});

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Donation',
      image: '',
      location: '',
      eventDate: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const eventDate = new Date(data.eventDate);
      if (eventDate <= new Date()) {
        toast.error('Event date must be in the future.');
        setLoading(false);
        return;
      }

      await apiCreateEvent({
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image,
        location: data.location,
        eventDate: data.eventDate,
      });

      toast.success('Event created successfully!');
      router.push('/events');
    } catch (err) {
      toast.error(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Donation', 'Plantation', 'Cleanup', 'Blood Donation', 'Education', 'Health', 'Other'];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/events" className="text-sm text-forest-600 dark:text-forest-400 hover:underline flex items-center gap-1">
          <span>←</span> Back to Events
        </Link>
        <h1 className="font-heading text-2xl font-bold text-forest-900 dark:text-white mt-4">
          Create a New Event
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize a social service event for your community.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Title
                </label>
                <input
                  {...form.register('title')}
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                    form.formState.errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                  }`}
                  placeholder="Winter Clothes Distribution"
                />
                {form.formState.errors.title && (
                  <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  {...form.register('description')}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                    form.formState.errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                  }`}
                  placeholder="Distribute warm clothes to underprivileged families..."
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-red-500">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  {...form.register('category')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thumbnail Image URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    {...form.register('image')}
                    type="url"
                    className={`pl-10 w-full pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                      form.formState.errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                    }`}
                    placeholder="https://example.com/event.jpg"
                  />
                </div>
                {form.formState.errors.image && (
                  <p className="text-xs text-red-500">{form.formState.errors.image.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    {...form.register('location')}
                    className="pl-10 w-full pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white"
                    placeholder="Mirpur 10, Dhaka"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Date & Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    {...form.register('eventDate')}
                    type="datetime-local"
                    className="pl-10 w-full pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-4 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
