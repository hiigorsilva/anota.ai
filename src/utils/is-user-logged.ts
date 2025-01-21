import { redirect } from 'next/navigation'
import { isUserAutenticated } from './is-user-authenticated'

export const isUserLogged = async (): Promise<void> => {
  const isAuthenticated = await isUserAutenticated()

  if (isAuthenticated) {
    redirect('/')
  } else {
    redirect('/sign-in')
  }
}
