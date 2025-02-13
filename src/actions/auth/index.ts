'use server'

import { signIn } from '@/auth'

export const signInAction = async () => {
  try {
    await signIn('google')

    return {
      success: true,
      message: 'Logado com sucesso',
    }
  } catch (err) {
    console.error('❌ SIGIN_ERROR: ', err)

    return {
      success: false,
      message: 'Erro ao fazer login',
    }
  }
}
