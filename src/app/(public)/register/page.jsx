'use client';

'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/lib/auth-client';
import { setToken } from '@/lib/api';
import { Loader2, Mail, Lock, User, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: '', email: '', image: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else if (!/[a-z]/.test(formData.password)) newErrors.password = 'Password needs a lowercase letter';
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Password needs an uppercase letter';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await signUp.email({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        image: formData.image || undefined,
        callbackUrl: '/events',
      });
      if (result?.token) {
        setToken(result.token);
        toast.success('Account created successfully!');
        router.push('/events');
        router.refresh();
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signUp.social({
        provider: 'google',
        callbackUrl: '/events',
      });
    } catch (err) {
      toast.error(err.message || 'Google sign up failed');
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
          <h2 className="font-heading text-2xl font-bold text-forest-900 dark:text-white">Create Your Account</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Join our community and start making a difference.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white'
                }`}
                placeholder="user@example.com"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Photo URL (optional)
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 w-full pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-900 dark:text-white"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Min 6 chars, with uppercase &amp; lowercase
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-forest-600 dark:text-forest-400 font-medium hover:underline">
            Login
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
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-700 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-all disabled:opacity-70"
        >
          <span>G</span> Continue with Google
        </button>
      </div>
    </div>
  );
}
