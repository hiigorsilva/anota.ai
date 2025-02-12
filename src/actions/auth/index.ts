'use server'

import type { SignupResult } from '@/@types/index'
import { signIn } from '@/auth'
import type { SignInType } from '@/schemas/signin-schema'
import type { SignUpType } from '@/schemas/signup-schema'
import { createUser, findUserByEmail } from '@/services/db/user'

export const signinAction = async (data: SignInType) => {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    return {
      success: true,
      message: 'Login efetuado com sucesso',
    }
  } catch (err: any) {
    console.error('❌ CREDENTIALS_ERROR: ', err)

    if (err.type === 'CredentialsSignin') {
      return {
        success: false,
        message: 'Email ou senha estão incorretos',
      }
    }

    return {
      success: false,
      message: 'Oops! Algo deu errado',
    }
  }
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
