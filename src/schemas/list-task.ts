import { z } from 'zod'

const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  status: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type TaskType = z.infer<typeof taskSchema>
