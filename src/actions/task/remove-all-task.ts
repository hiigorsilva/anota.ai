'use server'

import { removeAllTaskService } from '@/services/task'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const removeAllTaskAction = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }

    await removeAllTaskService(user.id)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao remover todas as tarefas: ', err)
  }
}
