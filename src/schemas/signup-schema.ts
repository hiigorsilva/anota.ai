import { z } from 'zod'

export const signupSchema = z.object({
  firstName: z
    .string({ required_error: 'Campo primeiro nome é obrigatório' })
    .min(2),
  lastName: z
    .string({ required_error: 'Campo sobrenome é obrigatório' })
    .min(2),
  email: z
    .string({ required_error: 'Campo email é obrigatório' })
    .email({ message: 'Insira um email valido' }),
  password: z
    .string({ required_error: 'Campo senha é obrigatório' })
    .min(6, { message: 'Senha deve conter ao menos 6 caracteres' }),
})

export type SignUpType = z.infer<typeof signupSchema>
