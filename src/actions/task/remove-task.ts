'use server'

import { removeTaskService } from '@/services/task'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const removeTaskAction = async (taskId: string) => {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }

    await removeTaskService(user.id, taskId)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao remover tarefa: ', err)
  }
}
