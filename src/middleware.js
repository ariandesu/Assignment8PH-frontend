import { NextResponse } from 'next/server';

// Private pages. A logged-in user has the Better Auth session cookie, so reloading
// any of these pages keeps them where they are instead of sending them to /login.
const PROTECTED_PREFIXES = ['/create-event', '/manage-events', '/joined-events', '/update-event', '/profile'];
const AUTH_PAGES = ['/login', '/register'];

// Better Auth session cookie ("__Secure-" prefixed on HTTPS)
const SESSION_COOKIES = ['better-auth.session_token', '__Secure-better-auth.session_token'];

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const hasSession = SESSION_COOKIES.some((name) => request.cookies.get(name)?.value);

  if (PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`)) && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (AUTH_PAGES.includes(pathname) && hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/create-event/:path*',
    '/manage-events/:path*',
    '/joined-events/:path*',
    '/update-event/:path*',
    '/profile/:path*',
    '/login',
    '/register',
  ],
};
