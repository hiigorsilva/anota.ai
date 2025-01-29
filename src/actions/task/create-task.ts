'use server'

import type { TaskFormType } from '@/schemas/task-form-schema'
import { createTaskService } from '@/services/task'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createTaskAction = async (task: TaskFormType) => {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }

    await createTaskService(user.id, task)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao adicionar tarefa: ', err)
  }
}
