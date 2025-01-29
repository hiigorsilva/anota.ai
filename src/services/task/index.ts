import { db } from '@/lib/prisma'
import type { TaskFormType } from '@/schemas/task-form-schema'

export const createTaskService = async (userId: string, data: TaskFormType) => {
  await db.user.upsert({
    where: { id: userId },
    create: { id: userId },
    update: {},
  })

  const task = await db.task.create({
    data: {
      userId: userId,
      title: data.title,
      status: data.status,
      description: data.description || '',
    },
  })
  return task
}

export const getTaskService = async (userId: string) => {
  const tasks = await db.task.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
  return tasks
}
