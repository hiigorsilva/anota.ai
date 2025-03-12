import { db } from '@/lib/db'
import type { EditSettingsType } from '@/schemas/edit-settings-schema'
import { revalidatePath } from 'next/cache'

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

export const editUser = async (userId: string, newData: EditSettingsType) => {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: {
        name: newData.name,
      },
    })
    revalidatePath('/settings')

    return user
  } catch (err) {
    console.error('❌ FAIL_TO_GET_USER_BY_EMAIL: ', err)
    return null
  }
}
