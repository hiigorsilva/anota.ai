import { z } from 'zod'

export const editSettingsSchema = z.object({
  name: z.string().min(2, { message: 'Deve conter no mínimo 2 caracteres' }),
  email: z.string().email({ message: 'Insira um email valido' }),
})

export type EditSettingsType = z.infer<typeof editSettingsSchema>
