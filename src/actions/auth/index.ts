'use server'

import type { SignInType } from '@/schemas/signin-schema'
import type { SignUpType } from '@/schemas/signup-schema'
import { createUser, findUserByEmail, loginUser } from '@/services/db/user'

export const signinAction = async (data: SignInType) => {
  try {
    await loginUser(data)
  } catch (err) {
    console.error('❌ Erro ao logar usuário: ', err)
  }
}

type SignupResult = {
  success: boolean
  message: string
  error?: string
}

export const signupAction = async (data: SignUpType): Promise<SignupResult> => {
  try {
    const user = await findUserByEmail(data.email)

    // ERRO AO VERIFICAR USUARIO
    if (user.error) {
      return {
        success: false,
        message: 'Erro ao verificar usuário existente',
        error: user.error,
      }
    }

    // USUARIO JA EXISTE
    if (user.exists) {
      return {
        success: false,
        message: 'Usuário já cadastrado',
        error: 'USER_ALREADY_EXISTS',
      }
    }

    // CRIA NOVO USUARIO
    await createUser(data)
    return {
      success: true,
      message: 'Usuário criado com sucesso',
    }
  } catch (err) {
    console.error('❌ Erro ao criar usuário: ', err)
    return {
      success: false,
      message: 'Erro ao criar usuário',
      error: err instanceof Error ? err.message : 'UNKNOWN_ERROR',
    }
  }
}
