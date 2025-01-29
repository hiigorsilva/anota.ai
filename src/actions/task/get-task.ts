'use server'

import { getTaskService } from '@/services/task'
import { currentUser } from '@clerk/nextjs/server'

export const getTaskAction = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return
    }

    const tasks = await getTaskService(user.id)

    return tasks ?? []
  } catch (err) {
    console.error('❌ Erro ao listar tarefas: ', err)
  }
}
