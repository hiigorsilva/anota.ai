import { auth } from '@/auth'

export const getUser = async () => {
  const user = await auth()
  return user
}
