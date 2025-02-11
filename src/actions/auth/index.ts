'use server'

import type { SignInType } from '@/schemas/signin-schema'
import type { SignUpType } from '@/schemas/signup-schema'
import { createUser, loginUser } from '@/services/db/user'

export const signinAction = async (data: SignInType) => {
  try {
    await loginUser(data)
  } catch (err) {
    console.error('❌ Erro ao logar usuário: ', err)
  }
}

export const signupAction = async (data: SignUpType) => {
  try {
    await createUser(data)
  } catch (err) {
    console.error('❌ Erro ao criar usuário: ', err)
  }
}
