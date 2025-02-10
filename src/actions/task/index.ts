'use server'

import { getUserClerk } from '@/lib/clerk'
import type { TaskFormType } from '@/schemas/task-form-schema'
import * as service from '@/services/task'
import { revalidatePath } from 'next/cache'

export const getTaskAction = async () => {
  try {
    const user = await getUserClerk()

    const tasks = await service.getTaskService(user.id)

    return tasks ?? []
  } catch (err) {
    console.error('❌ Erro ao listar tarefas: ', err)
  }
}

export const countTaskByStatusAction = async () => {
  try {
    const user = await getUserClerk()

    const task = await service.countTaskCountByStatusService(user.id)

    revalidatePath('/')
    revalidatePath('/tasks')

    return task ?? 0
  } catch (err) {
    console.error('❌ Erro ao listar quantidade de tarefas por status: ', err)
  }
}

export const countTotalTasksAction = async () => {
  try {
    const user = await getUserClerk()

    const totalTasks = await service.countTotalTasksService(user.id)
    return totalTasks
  } catch (err) {
    console.error('❌ Erro ao pegar o total de tarefas: ', err)
  }
}

export const createTaskAction = async (task: TaskFormType) => {
  try {
    const user = await getUserClerk()

    await service.createTaskService(user.id, task)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao adicionar tarefa: ', err)
  }
}

export const updateTaskAction = async (
  currentTask: TaskFormType,
  newTask: TaskFormType
) => {
  try {
    const user = await getUserClerk()

    const task = await service.updateTaskService(user.id, currentTask, newTask)

    revalidatePath('/')
    revalidatePath('/tasks')

    return task
  } catch (err) {
    console.error('❌ Erro ao adicionar tarefa: ', err)
  }
}

export const removeTaskAction = async (taskId: string) => {
  try {
    const user = await getUserClerk()

    await service.removeTaskService(user.id, taskId)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao remover tarefa: ', err)
  }
}

export const removeAllTaskAction = async () => {
  try {
    const user = await getUserClerk()

    await service.removeAllTaskService(user.id)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao remover todas as tarefas: ', err)
  }
}
