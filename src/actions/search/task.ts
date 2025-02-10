'use server'

import { getUserClerk } from '@/lib/clerk'
import { searchTaskService } from '@/services/task'

export const searchTaskAction = async (search: string) => {
  try {
    const user = await getUserClerk()

    const tasks = await searchTaskService(user.id, search)
    return tasks
  } catch (err) {
    console.error('❌ Erro ao listar tarefas: ', err)
  }
}
