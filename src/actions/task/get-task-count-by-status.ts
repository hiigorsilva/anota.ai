'use server'

import { getTaskCountByStatusService } from '@/services/task'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getTaskCountByStatusAction = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }

    const task = await getTaskCountByStatusService(user.id)

    revalidatePath('/')
    revalidatePath('/tasks')

    return task
  } catch (err) {
    console.error('❌ Erro ao listar quantidade de tarefas por status: ', err)
  }
}
