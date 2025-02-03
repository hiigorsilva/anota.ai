import { db } from '@/lib/prisma'
import type { TaskFormType } from '@/schemas/task-form-schema'
import { getCurrentMonth } from '@/utils/current-month'

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

export const removeAllTaskService = async (userId: string) => {
  const tasks = await db.task.deleteMany({
    where: { userId: userId },
  })
  return tasks
}

export const updateTaskService = async (
  userId: string,
  currentTask: TaskFormType,
  newTask: TaskFormType
) => {
  const task = await db.task.update({
    where: {
      userId: userId,
      id: currentTask.id,
    },
    data: {
      title: newTask.title,
      status: newTask.status,
      description: newTask.description || '',
    },
  })
  return task
}

export const getTaskCountByStatusService = async (userId: string) => {
  const date = new Date(Date.now()) // Provisório, enquanto nao tem sistema de calendário/agendamento
  const { startOfMonth, endOfMonth } = getCurrentMonth(date)

  const [pendding, doing, completed, canceled] = await Promise.all([
    // Pendding
    db.task.count({
      where: {
        userId: userId,
        status: 'Pendente',
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    }),

    // Doing
    db.task.count({
      where: {
        userId: userId,
        status: 'Fazendo',
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    }),

    // Completed
    db.task.count({
      where: {
        userId: userId,
        status: 'Concluído',
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    }),

    // Canceled
    db.task.count({
      where: {
        userId: userId,
        status: 'Cancelado',
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    }),
  ])

  return { pendding, doing, completed, canceled }
}

export const searchTaskService = async (userId: string, search: string) => {
  const tasks = await db.task.findMany({
    where: {
      userId: userId,

      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
  })

  return tasks
}
