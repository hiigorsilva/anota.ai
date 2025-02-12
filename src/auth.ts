import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signinSchema } from './schemas/signin-schema'
import { findUserByCredentials } from './services/db/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const { email, password } = await signinSchema.parseAsync(credentials)
        const user = await findUserByCredentials(email, password)

        return user
      },
    }),
  ],
})
