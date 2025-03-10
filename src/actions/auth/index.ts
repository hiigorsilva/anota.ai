'use server'

import { auth, signIn, signOut } from '@/auth'
import { redirect } from 'next/navigation'

export const loginAction = async () => {
  await signIn('google')
}

export const logoutAction = async () => {
  await signOut()
}

export const sessionUser = async () => {
  const session = await auth()

  if (!session?.user) {
    return redirect('/sign-in')
  }

  return session.user
}
