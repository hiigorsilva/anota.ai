import { z } from 'zod'

export const signinSchema = z.object({
  email: z
    .string({ required_error: 'Campo email é obrigatório' })
    .email({ message: 'Insira um email valido' }),
  password: z
    .string({ required_error: 'Campo senha é obrigatório' })
    .min(6, { message: 'Senha deve conter ao menos 6 caracteres' }),
})

export type SignInType = z.infer<typeof signinSchema>
