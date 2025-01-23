import { z } from 'zod'

export const taskFormSchema = z.object({
  title: z.string().min(3).max(25),
  // TODO:  change enum to union type
  status: z.enum(['Pendente', 'Fazendo', 'Concluído', 'Cancelado']),
  description: z.string().min(10).max(100).optional(),
})

export type TaskFormType = z.infer<typeof taskFormSchema>
