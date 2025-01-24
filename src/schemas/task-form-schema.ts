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
    .min(3, { message: 'Deve conter no mínimo 3 caracteres' })
    .max(25, { message: 'Não pode exceder 25 caracteres' }),
  status: taskStatus,
  description: z
    .string()
    .min(5, { message: 'Deve conter no mínimo 5 caracteres' })
    .max(100, { message: 'Não pode exceder 100 caracteres' })
    .optional(),
})

export type TaskStatusType = z.infer<typeof taskStatus>
export type TaskFormType = z.infer<typeof taskFormSchema>
