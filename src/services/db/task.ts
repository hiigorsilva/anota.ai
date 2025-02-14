import { db } from '@/lib/db'
import type { TaskFormType } from '@/schemas/task-form-schema'
import { revalidatePath } from 'next/cache'

export const createTask = async (userId: string, data: TaskFormType) => {
  try {
    await db.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        userId: userId,
      },
    })

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ CREATE_TASK_DB_ERROR', err)
  }
}
