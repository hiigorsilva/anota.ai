'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const getUserSession = async () => {
  const session = await auth()
  if (!session) {
    redirect('/sign-in')
  }

  const user = session.user
  if (!user) {
    redirect('/sign-in')
  }

  return { user }
}
