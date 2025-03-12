import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { env } from './env'
import { db } from './lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
})
