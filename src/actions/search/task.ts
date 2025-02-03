'use server'

import { searchTaskService } from '@/services/task'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const searchTaskAction = async (search: string) => {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }

    const tasks = await searchTaskService(user.id, search)
    return tasks
  } catch (err) {
    console.error('❌ Erro ao listar tarefas: ', err)
  }
}
