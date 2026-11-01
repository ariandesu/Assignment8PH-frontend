'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import {
  Menu,
  Moon,
  Sun,
  Users,
  Calendar,
  LogOut,
  ArrowRight,
  Google,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { setToken, removeToken } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.user) {
          setUser(session.user);
          const token = session.token;
          if (token) {
            setToken(token);
          }
        }
      } catch (e) {
        console.error('Auth session load failed', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      removeToken();
      setUser(null);
    } catch (e) {
      console.error('Sign out error', e);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Upcoming Events', href: '/events' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0f1b16]/90 backdrop-blur-md border-b border-sage/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-forest-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">🌱</span>
            </div>
            <Link href="/" className="font-heading text-xl font-bold tracking-tight text-forest-500 dark:text-white">
              Kindora
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-forest-500'
                    : 'text-gray-600 hover:text-forest-500 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/events"
              className="text-sm font-medium text-forest-500 dark:text-white hover:text-forest-600"
            >
              Explore Events <ArrowRight className="w-3 h-3 inline ml-1" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-forest-500 dark:hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary text-sm px-5 py-2"
                >
                  Create an Event
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-sage/40">
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-sage/50 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-3 h-3" /> Logout
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-sage/50 dark:hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-sage/20 bg-white dark:bg-[#0f1b16]">
          <div className="px-4 pt-6 pb-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-forest-500 dark:hover:text-white py-2"
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-forest-500 dark:hover:text-white py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block btn-primary w-full text-center py-2.5"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="flex items-center gap-3 w-full text-sm font-medium text-gray-600 dark:text-gray-300 py-2"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  Toggle Theme
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full text-sm font-medium text-red-500 py-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
