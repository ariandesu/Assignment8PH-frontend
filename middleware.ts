import { createServerClient } from '@better-auth/next';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register', '/events'];
const publicRoutePrefixes = ['/events/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) return NextResponse.next();
  if (publicRoutePrefixes.some((prefix) => pathname.startsWith(prefix)))
    return NextResponse.next();
  if (pathname.startsWith('/api/auth')) return NextResponse.next();
  if (pathname.startsWith('/_next')) return NextResponse.next();
  if (pathname.startsWith('/api/health')) return NextResponse.next();

  // Protected routes - check for token in cookies or redirect
  const token = request.cookies.get('kindora_token')?.value;

  if (!token) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
