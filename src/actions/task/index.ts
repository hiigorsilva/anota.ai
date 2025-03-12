'use server'

import type { TaskFormType } from '@/schemas/task-form-schema'
import * as taskService from '@/services/db/task'
import type { Task } from '@prisma/client'
import { redirect } from 'next/navigation'
import { sessionUser } from '../auth'

export const getAllTasksAction = async () => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      throw new Error('Unauthenticated user')
    }

    const tasks = await taskService.listAllTasks(session.id)

    return tasks
  } catch (err) {
    console.error('❌ LIST_ALL_TASKS_ERROR', err)
    return null
  }
}

export const getSearchTasksAction = async (search: string) => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      throw new Error('Unauthenticated user')
    }

    const tasks = await taskService.listSearchTasks(session.id, search)

    return tasks
  } catch (err) {
    console.error('❌ LIST_SEARCH_TASKS_ERROR', err)
    return null
  }
}

export const getDoingTasksAction = async () => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      throw new Error('Unauthenticated user')
    }

    const doingTasks = await taskService.listDoingTasks(session.id)

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

    await taskService.createTask(session.id, data)

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

export const updateTaskAction = async (
  currentTask: Task,
  newTask: TaskFormType
) => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      return {
        success: false,
        message: 'Usuário não autenticado',
      }
    }

    await taskService.updateTask(session.id, currentTask, newTask)

    return {
      success: true,
      message: 'Tarefa editada com sucesso',
    }
  } catch (err) {
    console.error('❌ DELETE_TASK_ERROR', err)
    return {
      success: false,
      message: 'Erro ao editar tarefa',
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

    await taskService.deleteTask(session.id, task)

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

export const deleteAllTaskAction = async () => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      return {
        success: false,
        message: 'Usuário não autenticado',
      }
    }

    await taskService.deleteAllTask(session.id)

    return {
      success: true,
      message: 'Todas as tarefas foram excluídas',
    }
  } catch (err) {
    console.error('❌ DELETE_TASK_ERROR', err)
    return {
      success: false,
      message: 'Erro ao excluir todas as tarefas',
    }
  }
}

export const countTasksAction = async () => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      return redirect('/sign-in')
    }

    const count = await taskService.countTasks(session.id)
    if (!count) {
      return {
        pending: 0,
        doing: 0,
        completed: 0,
        canceled: 0,
      }
    }

    return {
      pending: count.pending,
      doing: count.doing,
      completed: count.completed,
      canceled: count.canceled,
    }
  } catch (err) {
    console.error('❌ COUNT_TASKS_ERROR', err)
  }
}
