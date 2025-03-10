'use server'
import type { EditSettingsType } from '@/schemas/edit-settings-schema'
import * as userService from '@/services/db/user'
import { redirect } from 'next/navigation'
import { sessionUser } from '../auth'

export const getUserAction = async () => {
  const session = await sessionUser()
  if (!session.id) {
    redirect('/sign-in')
  }

  const user = await userService.findUserById(session.id)
  if (!user) return null

  return user
}

export const editUserAction = async (newData: EditSettingsType) => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      return {
        success: false,
        message: 'Usuário não autenticado',
      }
    }

    await userService.editUser(session.id, newData)

    return {
      success: true,
      message: 'Usuário editado com sucesso',
    }
  } catch (err) {
    console.error('❌ EDIT_USER_ERROR', err)
    return {
      success: false,
      message: 'Erro ao editar usuário',
    }
  }
}
