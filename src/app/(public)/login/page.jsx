'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { safeCallbackUrl } from '@/lib/utils';
import AuthField from '@/components/auth/AuthField';
import GoogleButton from '@/components/auth/GoogleButton';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get('callbackUrl'), '/');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const { error } = await signIn.email({ email: values.email, password: values.password });
    setLoading(false);

    if (error) {
      toast.error(error.status === 401 ? 'Incorrect email or password.' : error.message || 'Login failed. Please try again.');
      return;
    }

    toast.success('Welcome back! You are now logged in.');
    router.replace(callbackUrl);
    router.refresh();
  };

  return (
    <Card className="w-full max-w-md p-8">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Log in to create, join and manage community events.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <AuthField label="Email" icon={Mail} type="email" placeholder="you@example.com" autoComplete="email" error={errors.email?.message} {...register('email')} />
        <AuthField label="Password" icon={Lock} type="password" placeholder="Your password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />} Log In
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-[#16221c] px-3 text-gray-500 dark:text-gray-400">or</span>
        </div>
      </div>

      <GoogleButton callbackURL={callbackUrl} />

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        New to Kindora?{' '}
        <Link href={`/register${callbackUrl !== '/' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`} className="text-forest-600 dark:text-forest-300 font-semibold hover:underline">
          Create an account
        </Link>
      </p>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <Suspense fallback={<div className="w-full max-w-md h-[520px] card animate-pulse" />}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
