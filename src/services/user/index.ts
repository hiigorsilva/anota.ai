import { getUserClerk } from '@/lib/clerk'
import { db } from '@/lib/prisma'

export const getUserByID = async () => {
  const userFromClerk = await getUserClerk()

  const user = await db.user.findUnique({
    where: { id: userFromClerk.id },
  })

  return user
}
