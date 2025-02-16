'use server'

import type { TaskFormType } from '@/schemas/task-form-schema'
import { createTask, deleteTask, listDoingTasks } from '@/services/db/task'
import type { Task } from '@prisma/client'
import { sessionUser } from '../auth'

export const getDoingTasksAction = async () => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      throw new Error('Unauthenticated user')
    }

    const doingTasks = await listDoingTasks(session.id)

    return doingTasks
  } catch (err) {
    console.error('❌ LIST_DOING_TASK_ERROR', err)
    return null
  }
}

export const createTaskAction = async (data: TaskFormType) => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      return {
        success: false,
        message: 'Usuário não autenticado',
      }
    }

    await createTask(session.id, data)

    return {
      success: true,
      message: 'Tarefa criada com sucesso',
    }
  } catch (err) {
    console.error('❌ CREATE_TASK_ERROR', err)
    return {
      success: false,
      message: 'Erro ao criar tarefa',
    }
  }
}

export const deleteTaskAction = async (task: Task) => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      return {
        success: false,
        message: 'Usuário não autenticado',
      }
    }

    await deleteTask(session.id, task)

    return {
      success: true,
      message: 'Tarefa excluída com sucesso',
    }
  } catch (err) {
    console.error('❌ DELETE_TASK_ERROR', err)
    return {
      success: false,
      message: 'Erro ao excluir tarefa',
    }
  }
}
