import { db } from '@/lib/db'
import type { TaskFormType } from '@/schemas/task-form-schema'
import { revalidateTasks } from '@/utils/revalidate-path'
import { TASK_STATUS, type Task } from '@prisma/client'

export const listAllTasks = async (userId: string) => {
  try {
    const allTasks = await db.task.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    })
    revalidateTasks()

    return allTasks
  } catch (err) {
    console.error('❌ LIST_ALL_TASKS_DB_ERROR', err)
    return null
  }
}

export const listSearchTasks = async (userId: string, search: string) => {
  try {
    const searchTasks = await db.task.findMany({
      where: {
        userId: userId,
        OR: [
          {
            title: { contains: search },
          },
          {
            description: { contains: search },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    })
    revalidateTasks()

    return searchTasks
  } catch (err) {
    console.error('❌ LIST_SEARCH_TASKS_DB_ERROR', err)
    return null
  }
}

export const listDoingTasks = async (userId: string) => {
  try {
    const doingTasks = await db.task.findMany({
      where: { userId: userId, status: 'Fazendo' },
      orderBy: { createdAt: 'desc' },
    })
    revalidateTasks()

    return doingTasks
  } catch (err) {
    console.error('❌ LIST_PENDDING_TASKS_DB_ERROR', err)
    return null
  }
}

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

    revalidateTasks()
  } catch (err) {
    console.error('❌ CREATE_TASK_DB_ERROR', err)
  }
}

export const updateTask = async (
  userId: string,
  currentTask: Task,
  newTask: TaskFormType
) => {
  try {
    const task = await db.task.update({
      where: { userId: userId, id: currentTask.id },
      data: {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      },
    })

    revalidateTasks()
    return task
  } catch (err) {
    console.error('❌ UPDATE_TASK_DB_ERROR', err)
    return null
  }
}

export const deleteTask = async (userId: string, task: TaskFormType) => {
  try {
    await db.task.delete({
      where: { userId: userId, id: task.id },
    })

    revalidateTasks()
  } catch (err) {
    console.error('❌ DELETE_TASK_DB_ERROR', err)
  }
}

export const deleteAllTask = async (userId: string) => {
  try {
    await db.task.deleteMany({
      where: { userId: userId },
    })

    revalidateTasks()
  } catch (err) {
    console.error('❌ DELETE_TASK_DB_ERROR', err)
  }
}

export const countTasks = async (userId: string) => {
  try {
    const contTasks = await Promise.all([
      db.task.count({
        where: {
          userId: userId,
          status: TASK_STATUS.Pendente,
        },
      }),

      db.task.count({
        where: {
          userId: userId,
          status: TASK_STATUS.Fazendo,
        },
      }),

      db.task.count({
        where: {
          userId: userId,
          status: TASK_STATUS.Concluído,
        },
      }),

      db.task.count({
        where: {
          userId: userId,
          status: TASK_STATUS.Cancelado,
        },
      }),
    ])

    return {
      pending: contTasks[0],
      doing: contTasks[1],
      completed: contTasks[2],
      canceled: contTasks[3],
    }
  } catch (err) {
    console.error('❌ COUNT_TASKS_DB_ERROR', err)
  }
}
