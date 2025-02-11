import type { SignInType } from '@/schemas/signin-schema'
import type { SignUpType } from '@/schemas/signup-schema'

export const loginUser = async (data: SignInType) => {
  try {
    console.log(data)
  } catch (err) {
    console.error('❌ Falha ao encontrar o usuário no sistema: ', err)
  }
}

export const createUser = async (data: SignUpType) => {
  try {
    console.log(data)
  } catch (err) {
    console.error('❌ Falha ao criar usuário no sistema: ', err)
  }
}
