'use server'

import type { TaskFormType } from '@/schemas/task-form-schema'
import { createTask } from '@/services/db/task'
import { sessionUser } from '../auth'

export const createTaskAction = async (data: TaskFormType) => {
  try {
    const session = await sessionUser()
    if (!session.id) {
      return {
        success: false,
        message: 'Usuário não identificado',
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
