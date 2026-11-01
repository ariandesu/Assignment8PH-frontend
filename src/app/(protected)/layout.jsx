'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { PageSkeleton } from '@/components/shared/LoadingSkeleton';

// Client-side guard for private pages (middleware handles the first request).
// While the session loads we show a skeleton instead of redirecting, so a
// logged-in user who reloads a private page stays on it.
export default function ProtectedLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, pathname, router]);

  if (isPending || !session) return <PageSkeleton />;

  return children;
}
