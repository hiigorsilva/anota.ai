import { db } from '@/lib/prisma'
import type { TaskFormType } from '@/schemas/task-form-schema'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const createTaskService = async (data: TaskFormType) => {
  const user = await currentUser()
  if (!user) {
    console.error('❌ Usuário nao autenticado')
    redirect('/sign-in')
  }

  await db.user.upsert({
    where: { id: user.id },
    create: { id: user.id },
    update: {},
  })

  const task = await db.task.create({
    data: {
      userId: user.id,
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
