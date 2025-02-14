import { db } from '@/lib/db'

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    })

    return {
      exists: Boolean(user),
      user: user,
    }
  } catch (err) {
    console.error('❌ ERRO_AO_BUSCAR_USUÁRIO: ', err)
    return {
      exists: false,
      error: err instanceof Error ? err.message : 'UNKNOWN_ERROR',
    }
  }
}
