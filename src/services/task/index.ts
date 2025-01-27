import { db } from '@/lib/prisma'
import type { TaskFormType } from '@/schemas/task-form-schema'

export const createTaskService = async (data: TaskFormType) => {
  await db.task.create({
    data: {
      title: data.title,
      status: data.status,
      description: data.description,
    },
  })
}
