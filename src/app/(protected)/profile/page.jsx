'use client';

export const dynamic = 'force-dynamic';

// Profile page for updating display name and profile picture

import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, User, Mail, Image as ImageIcon } from 'lucide-react';
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '', image: '' },
  });

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        setUserData(data.user);
        form.reset({
          name: data.user.name || '',
          email: data.user.email || '',
          image: data.user.image || '',
        });
      } catch (err) {
        toast.error(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [form]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const result = await updateProfile({
        name: data.name,
        email: data.email,
        image: data.image || undefined,
      });
      toast.success('Profile updated successfully!');
      setUserData(result.user);
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <LoadingSkeleton className="w-20 h-20 rounded-full" />
            <div className="flex-1">
              <LoadingSkeleton className="h-8 w-3/4 mb-3" />
              <LoadingSkeleton className="h-4 w-1/2 mb-6" />
              <LoadingSkeleton className="h-4 w-full mb-3" />
              <LoadingSkeleton className="h-4 w-2/3 mb-3" />
              <LoadingSkeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information.
          </p>
        </div>

        <div className="card p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="relative">
                <ImageIcon
                  src={userData.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name || 'User') + '&background=174D3B&color=fff'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-forest-100 dark:border-[#1f2d26]"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-xl font-bold text-forest-900 dark:text-white mb-1">
                {userData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                {...form.register('name')}
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                  form.formState.errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                }`}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                {...form.register('email')}
                type="email"
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                  form.formState.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                }`}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Picture URL
              </label>
              <input
                {...form.register('image')}
                type="url"
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                  form.formState.errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                }`}
                placeholder="https://example.com/photo.jpg"
              />
              {form.formState.errors.image && (
                <p className="text-xs text-red-500">{form.formState.errors.image.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full btn-primary py-4 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
