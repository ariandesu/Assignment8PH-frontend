'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, Lock, User, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { signUp } from '@/lib/auth-client';
import { safeCallbackUrl } from '@/lib/utils';
import AuthField from '@/components/auth/AuthField';
import GoogleButton from '@/components/auth/GoogleButton';

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60, 'Name is too long'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  photoURL: z.string().trim().min(1, 'Photo URL is required').url('Enter a valid image URL (https://...)'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter'),
});

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get('callbackUrl'), '/');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', photoURL: '', password: '' },
  });

  const onInvalid = (formErrors) => {
    if (formErrors.password) toast.error(formErrors.password.message);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      image: values.photoURL,
      password: values.password,
    });
    setLoading(false);

    if (error) {
      toast.error(
        error.code === 'USER_ALREADY_EXISTS' || error.status === 422
          ? 'An account with this email already exists. Please log in.'
          : error.message || 'Registration failed. Please try again.'
      );
      return;
    }

    toast.success('Account created! Welcome to Kindora.');
    router.replace(callbackUrl);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md card p-8">
      <div className="text-center mb-8">
        <h1 className="section-title">Create Your Account</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Join neighbours who turn good intentions into action.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4" noValidate>
        <AuthField label="Name" icon={User} placeholder="Your full name" autoComplete="name" error={errors.name?.message} {...register('name')} />
        <AuthField label="Email" icon={Mail} type="email" placeholder="you@example.com" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <AuthField label="Photo URL" icon={ImageIcon} type="url" placeholder="https://example.com/photo.jpg" error={errors.photoURL?.message} {...register('photoURL')} />
        <AuthField
          label="Password"
          icon={Lock}
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          hint="At least 6 characters with an uppercase and a lowercase letter."
          error={errors.password?.message}
          {...register('password')}
        />

        <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />} Register
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-[#16221c] px-3 text-gray-500 dark:text-gray-400">or</span>
        </div>
      </div>

      <GoogleButton callbackURL={callbackUrl} />

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-forest-600 dark:text-forest-300 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <Suspense fallback={<div className="w-full max-w-md h-[640px] card animate-pulse" />}>
        <RegisterForm />
      </Suspense>
    </section>
  );
}
