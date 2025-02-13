'use server'

import type { TaskFormType } from '@/schemas/task-form-schema'
// import * as service from '@/services/task'
import { revalidatePath } from 'next/cache'

export const getTaskAction = async () => {
  try {
    // const tasks = await service.getTaskService(user.id)

    return []
  } catch (err) {
    console.error('❌ Erro ao listar tarefas: ', err)
  }
}

export const countTaskByStatusAction = async () => {
  try {
    // const task = await service.countTaskCountByStatusService(user.id)

    revalidatePath('/')
    revalidatePath('/tasks')

    return 0
  } catch (err) {
    console.error('❌ Erro ao listar quantidade de tarefas por status: ', err)
  }
}

export const countTotalTasksAction = async () => {
  try {
    // const totalTasks = await service.countTotalTasksService(user.id)
    return 0
  } catch (err) {
    console.error('❌ Erro ao pegar o total de tarefas: ', err)
  }
}

export const createTaskAction = async (_task: TaskFormType) => {
  try {
    // await service.createTaskService(user.id, task)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao adicionar tarefa: ', err)
  }
}

export const updateTaskAction = async (
  _currentTask: TaskFormType,
  _newTask: TaskFormType
) => {
  try {
    // const task = await service.updateTaskService(user.id, currentTask, newTask)

    revalidatePath('/')
    revalidatePath('/tasks')

    // return task
  } catch (err) {
    console.error('❌ Erro ao adicionar tarefa: ', err)
  }
}

export const removeTaskAction = async (_taskId: string) => {
  try {
    // await service.removeTaskService(user.id, taskId)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao remover tarefa: ', err)
  }
}

export const removeAllTaskAction = async () => {
  try {
    // await service.removeAllTaskService(user.id)

    revalidatePath('/')
    revalidatePath('/tasks')
  } catch (err) {
    console.error('❌ Erro ao remover todas as tarefas: ', err)
  }
}
