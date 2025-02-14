import { db } from '@/lib/db'

export const findUserById = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    return user
  } catch (err) {
    console.error('❌ FAIL_TO_GET_USER_BY_EMAIL: ', err)
    return null
  }
}
