'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, User, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { updateUser, useSession } from '@/lib/auth-client';
import { clearToken } from '@/lib/api';
import AuthField from '@/components/auth/AuthField';
import Avatar from '@/components/shared/Avatar';

const profileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60, 'Name is too long'),
  image: z.string().trim().url('Enter a valid image URL (https://...)').or(z.literal('')),
});

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting, isDirty } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', image: '' },
  });

  useEffect(() => {
    if (user) reset({ name: user.name || '', image: user.image || '' });
  }, [user, reset]);

  const onSubmit = async (values) => {
    const { error } = await updateUser({ name: values.name, image: values.image || null });
    if (error) {
      toast.error(error.message || 'Could not update your profile.');
      return;
    }
    clearToken(); // next API call picks up a token with the new name/photo
    toast.success('Profile updated successfully!');
    router.refresh();
  };

  if (!user) return null;

  const previewImage = watch('image');
  const previewName = watch('name');

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="section-title">My Profile</h1>
        <p className="section-subtitle">Update the name and photo other volunteers see.</p>
      </div>

      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-sage dark:border-white/10">
          <Avatar src={errors.image ? user.image : previewImage} name={previewName || user.name} className="w-20 h-20 text-2xl" />
          <div className="min-w-0">
            <p className="font-heading text-xl font-bold text-forest-900 dark:text-white truncate">{previewName || user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 truncate">
              <Mail className="w-4 h-4 shrink-0" /> {user.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <AuthField label="Name" icon={User} error={errors.name?.message} {...register('name')} />
          <AuthField label="Photo URL" icon={ImageIcon} type="url" placeholder="https://example.com/photo.jpg" error={errors.image?.message} {...register('image')} />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input value={user.email} disabled className="input opacity-70 cursor-not-allowed" />
          </div>
          <button type="submit" disabled={isSubmitting || !isDirty} className="w-full btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}
