'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, LogOut, PlusCircle, Settings2, CalendarCheck, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { authClient, useSession } from '@/lib/auth-client';
import { clearToken } from '@/lib/api';
import ThemeToggle from './ThemeToggle';
import Avatar from './Avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Upcoming Events', href: '/events' },
];

const USER_LINKS = [
  { name: 'Create Event', href: '/create-event', icon: PlusCircle },
  { name: 'Manage Events', href: '/manage-events', icon: Settings2 },
  { name: 'Joined Events', href: '/joined-events', icon: CalendarCheck },
  { name: 'My Profile', href: '/profile', icon: UserRound },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="w-9 h-9 bg-forest-500 rounded-xl flex items-center justify-center text-white text-lg">🌱</span>
      <span className="font-heading text-xl font-extrabold tracking-tight text-forest-500 dark:text-white">Kindora</span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    clearToken();
    toast.success('You have been logged out.');
    router.push('/');
    router.refresh();
  };

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0f1b16]/90 backdrop-blur-md border-b border-sage/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-forest-500 dark:text-white underline underline-offset-8 decoration-2 decoration-orange'
                    : 'text-gray-600 hover:text-forest-500 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {isPending ? (
              <span className="w-9 h-9 rounded-full bg-sage dark:bg-[#1f2d26] animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="group relative flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
                      aria-label={`Account menu for ${user.name}`}
                    >
                      <Avatar src={user.image} name={user.name} />
                      {/* Display name on hover */}
                      <span className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-lg bg-forest-900 dark:bg-white px-3 py-1.5 text-xs font-medium text-white dark:text-forest-900 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-0 transition-opacity shadow-lg">
                        {user.name}
                      </span>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <p className="text-sm font-semibold text-forest-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {USER_LINKS.map(({ name, href, icon: Icon }) => (
                      <DropdownMenuItem
                        key={href}
                        asChild
                        className={isActive(href) ? 'bg-sage/60 dark:bg-white/10 text-forest-600 dark:text-white font-medium' : ''}
                      >
                        <Link href={href}>
                          <Icon className="w-4 h-4" /> {name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden sm:inline-flex gap-1.5 font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            ) : (
              <Button asChild size="sm" className="px-5">
                <Link href="/login">Login</Link>
              </Button>
            )}

            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-sage/50 dark:hover:bg-white/10"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-sage/40 dark:border-white/10 bg-white dark:bg-[#0f1b16] px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-xl text-sm font-medium ${
                isActive(link.href) ? 'bg-sage/60 dark:bg-white/10 text-forest-600 dark:text-white' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              {/* Account links, same as the profile dropdown */}
              <div className="flex items-center gap-3 px-3 pt-4 pb-2 mt-3 border-t border-sage/40 dark:border-white/10">
                <Avatar src={user.image} name={user.name} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-forest-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
              {USER_LINKS.map(({ name, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium ${
                    isActive(href) ? 'bg-sage/60 dark:bg-white/10 text-forest-600 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {name}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            !isPending && (
              <Button asChild className="w-full mt-3">
                <Link href="/login">Login</Link>
              </Button>
            )
          )}
        </div>
      )}
    </nav>
  );
}
