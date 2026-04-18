import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const adminEmails = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;
      return adminEmails.includes(email);
    },
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        return !!session;
      }
      return true;
    },
  },
});
