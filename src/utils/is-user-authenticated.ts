import { auth } from '@clerk/nextjs/server'

export const isUserAutenticated = async () => {
  try {
    const { userId } = await auth()
    return userId
  } catch (err) {
    console.error(err, 'USER AUTH: Usuário não autenticado')
    throw new Error('USER AUTH: Usuário não autenticado')
  }
}
