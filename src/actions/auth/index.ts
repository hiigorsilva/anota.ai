'use server'

import { signIn, signOut } from '@/auth'

export const loginAction = async () => {
  await signIn('google')
}

export const logoutAction = async () => {
  await signOut()
}
