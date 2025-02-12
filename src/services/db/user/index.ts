import { db } from '@/lib/db'
import type { SignInType } from '@/schemas/signin-schema'
import type { SignUpType } from '@/schemas/signup-schema'
import { hashSync } from 'bcrypt-ts'

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email },
      omit: { password: true },
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

export const loginUser = async (data: SignInType) => {
  console.log(data)
}

export const createUser = async (data: SignUpType) => {
  try {
    const user = await db.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashSync(data.password),
      },
    })

    return user
  } catch (err) {
    console.error('❌ Erro ao criar usuário: ', err)
  }
}
