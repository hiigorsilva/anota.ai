'use server'

import { findUserById } from '@/services/db/user'
import { redirect } from 'next/navigation'
import { sessionUser } from '../auth'

export const getUserAction = async () => {
  const session = await sessionUser()
  if (!session.id) {
    redirect('/sign-in')
  }

  const user = await findUserById(session.id)
  if (!user) return null

  return user
}
