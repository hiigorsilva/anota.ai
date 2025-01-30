'use server'

import type { TaskFormType } from '@/schemas/task-form-schema'
import { updateTaskService } from '@/services/task'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const updateTaskAction = async (
  currentTask: TaskFormType,
  newTask: TaskFormType
) => {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }

    const task = await updateTaskService(user.id, currentTask, newTask)

    revalidatePath('/')
    revalidatePath('/tasks')

    return task
  } catch (err) {
    console.error('❌ Erro ao adicionar tarefa: ', err)
  }
}
