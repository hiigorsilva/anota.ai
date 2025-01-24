import { z } from 'zod'

const taskStatus = z
  .union([
    z.literal('Pendente'),
    z.literal('Fazendo'),
    z.literal('Concluído'),
    z.literal('Cancelado'),
  ])
  .default('Pendente')

export const taskFormSchema = z.object({
  title: z.string().min(3).max(25),
  status: taskStatus,
  description: z.string().min(10).max(100).optional(),
})

export type TaskStatusType = z.infer<typeof taskStatus>
export type TaskFormType = z.infer<typeof taskFormSchema>
