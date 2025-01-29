'use server'

import type { TaskType } from '@/schemas/list-task'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const editTaskAction = async (_task: TaskType) => {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }

    // await editTaskService(user.id, task)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao editar tarefa: ', err)
  }
}
