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
  title: z
    .string({ required_error: 'Campo obrigatório' })
    .min(2, { message: 'Deve conter no mínimo 2 caracteres' })
    .max(35, { message: 'Não pode exceder 35 caracteres' }),
  status: taskStatus,
  description: z
    .string()
    .min(2, { message: 'Deve conter no mínimo 2 caracteres' })
    .max(150, { message: 'Você excedeu o limite de 150 caracteres' }),
})

export type TaskStatusType = z.infer<typeof taskStatus>
export type TaskFormType = z.infer<typeof taskFormSchema>
