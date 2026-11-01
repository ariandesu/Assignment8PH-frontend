'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, MapPin, Image as ImageIcon, ImageOff, CalendarClock, Type, Tag } from 'lucide-react';
import { EVENT_CATEGORIES, toDateTimeLocal } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input, Textarea, fieldClasses } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const eventSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(120, 'Title must be at most 120 characters'),
  description: z.string().trim().min(10, 'Description must be at least 10 characters').max(2000, 'Description must be at most 2000 characters'),
  category: z.enum(EVENT_CATEGORIES, { errorMap: () => ({ message: 'Please choose an event type' }) }),
  image: z.string().trim().min(1, 'Thumbnail image URL is required').url('Enter a valid image URL (https://...)'),
  location: z.string().trim().min(3, 'Location must be at least 3 characters').max(150, 'Location is too long'),
  eventDate: z
    .string()
    .min(1, 'Event date is required')
    .refine((v) => !Number.isNaN(new Date(v).getTime()), 'Enter a valid date')
    .refine((v) => new Date(v) > new Date(), 'Event date must be in the future'),
});

const IMAGE_LINK_ERROR =
  "This link doesn't open an image. Right-click the picture and choose \"Copy image address\" (the link usually ends in .jpg, .png or .webp).";

// Resolves true only if the browser can actually display the URL as an image
const canLoadImage = (url) =>
  new Promise((resolve) => {
    const img = new window.Image();
    const timer = setTimeout(() => resolve(false), 10_000);
    img.onload = () => { clearTimeout(timer); resolve(img.naturalWidth > 0); };
    img.onerror = () => { clearTimeout(timer); resolve(false); };
    img.src = url;
  });

const EMPTY = { title: '', description: '', category: '', image: '', location: '', eventDate: '' };

export default function EventForm({ initialValues, onSubmit, submitLabel, submittingLabel }) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: initialValues
      ? { ...EMPTY, ...initialValues, eventDate: toDateTimeLocal(initialValues.eventDate) }
      : EMPTY,
  });

  const imageUrl = watch('image');
  const minDate = toDateTimeLocal(Date.now() + 60_000);
  const isHttpUrl = /^https?:\/\/\S+$/i.test(imageUrl?.trim() || '');

  // Live preview check: 'checking' | 'ok' | 'broken'
  const [previewStatus, setPreviewStatus] = useState('checking');
  useEffect(() => {
    if (!isHttpUrl) return undefined;
    let cancelled = false;
    setPreviewStatus('checking');
    const timer = setTimeout(async () => {
      const ok = await canLoadImage(imageUrl.trim());
      if (cancelled) return;
      setPreviewStatus(ok ? 'ok' : 'broken');
      if (ok) clearErrors('image');
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [imageUrl, isHttpUrl, clearErrors]);

  const submit = async (values) => {
    if (!(await canLoadImage(values.image))) {
      setError('image', { message: IMAGE_LINK_ERROR }, { shouldFocus: true });
      return;
    }
    await onSubmit({ ...values, eventDate: new Date(values.eventDate).toISOString() });
  };

  return (
    <Card asChild>
    <form onSubmit={handleSubmit(submit)} className="p-6 sm:p-8 space-y-5" noValidate>
      <Field id="title" label="Event title" icon={Type} error={errors.title?.message}>
        <Input id="title" {...register('title')} aria-invalid={Boolean(errors.title)} className="pl-10" placeholder="Winter Clothes Distribution" />
      </Field>

      <Field id="description" label="Description" error={errors.description?.message}>
        <Textarea
          id="description"
          {...register('description')}
          aria-invalid={Boolean(errors.description)}
          rows={5}
          placeholder="What will volunteers do, what should they bring, and who will this help?"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="category" label="Event type" icon={Tag} error={errors.category?.message}>
          <select id="category" {...register('category')} aria-invalid={Boolean(errors.category)} className={cn(fieldClasses, 'pl-10')}>
            <option value="" disabled>Select an event type</option>
            {EVENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field id="eventDate" label="Event date & time" icon={CalendarClock} error={errors.eventDate?.message}>
          <Input id="eventDate" type="datetime-local" min={minDate} {...register('eventDate')} aria-invalid={Boolean(errors.eventDate)} className="pl-10" />
        </Field>
      </div>

      <Field id="location" label="Location" icon={MapPin} error={errors.location?.message}>
        <Input id="location" {...register('location')} aria-invalid={Boolean(errors.location)} className="pl-10" placeholder="Mirpur 10, Dhaka" />
      </Field>

      <Field id="image" label="Thumbnail image URL" icon={ImageIcon} error={errors.image?.message}>
        <Input id="image" type="url" {...register('image')} aria-invalid={Boolean(errors.image)} className="pl-10" placeholder="https://images.unsplash.com/..." />
      </Field>

      {isHttpUrl && !errors.image && (
        <div className="rounded-2xl overflow-hidden border border-sage dark:border-white/10">
          {previewStatus === 'broken' ? (
            <p className="flex items-center gap-2 p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10">
              <ImageOff className="w-4 h-4 shrink-0" /> {IMAGE_LINK_ERROR}
            </p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl.trim()}
              alt="Thumbnail preview"
              className={cn('w-full h-48 object-cover bg-sage dark:bg-[#1f2d26]', previewStatus === 'checking' && 'animate-pulse')}
            />
          )}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </form>
    </Card>
  );
}

function Field({ id, label, icon: Icon, error, children }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-[1.1rem] w-4 h-4 text-gray-400 pointer-events-none z-10" />}
        {children}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
