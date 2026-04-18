import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { auth } from './auth';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!req.auth && pathname !== '/admin/login') {
      const loginUrl = new URL('/admin/login', req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/',
    '/(fr|en)/:path*',
    '/admin/:path*',
    '/((?!_next|api|favicon.ico|.*\\.).*)',
  ],
};
