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

export const removeTaskService = async (userId: string, taskId: string) => {
  const task = await db.task.delete({
    where: { userId: userId, id: taskId },
  })
  return task
}

export const updateTaskService = async (
  userId: string,
  currentTask: TaskFormType,
  newTask: TaskFormType
) => {
  const task = await db.task.update({
    where: { userId: userId, id: currentTask.id },
    data: {
      title: newTask.title,
      status: newTask.status,
      description: newTask.description || '',
    },
  })
  return task
}
