'use client';

'use client';

export const dynamic = 'force-dynamic';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';
import { setToken } from '@/lib/api';
import { Loader2, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/events';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
        callbackUrl: callbackUrl,
      });
      if (result?.token) {
        setToken(result.token);
        toast.success('Welcome back!');
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackUrl: callbackUrl,
      });
    } catch (err) {
      toast.error(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-cream py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="w-10 h-10 bg-forest-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🌱</span>
            </div>
            <span className="font-heading text-2xl font-bold text-forest-900 dark:text-white">Kindora</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to continue being part of our community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
              }`}
              placeholder="user@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don&rsquo;t have an account?{' '}
          <Link href="/register" className="text-forest-600 dark:text-forest-400 font-medium hover:underline">
            Register
          </Link>
        </p>

        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-[#0f1b16] px-4 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-700 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-all disabled:opacity-70"
        >
          <span>G</span> Continue with Google
        </button>
      </div>
    </div>
  );
}
