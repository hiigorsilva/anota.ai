import { db } from '@/lib/db'
import type { TaskFormType } from '@/schemas/task-form-schema'
import type { Task } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const listDoingTasks = async (userId: string) => {
  try {
    const doingTasks = await db.task.findMany({
      where: { userId: userId, status: 'Fazendo' },
      orderBy: { createdAt: 'desc' },
    })
    revalidatePath('/')

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

    revalidatePath('/')
    revalidatePath('/tasks')
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

    revalidatePath('/')
    revalidatePath('/tasks')
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

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ DELETE_TASK_DB_ERROR', err)
  }
}

export const deleteAllTask = async (userId: string) => {
  try {
    await db.task.deleteMany({
      where: { userId: userId },
    })

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ DELETE_TASK_DB_ERROR', err)
  }
}
