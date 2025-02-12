import { z } from 'zod'

export const signupSchema = z.object({
  fullName: z
    .string({ required_error: 'Campo nome é obrigatório' })
    .min(2, { message: 'Nome deve conter ao menos 2 caracteres' })
    .trim(),
  email: z
    .string({ required_error: 'Campo email é obrigatório' })
    .email({ message: 'Insira um email valido' })
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Campo senha é obrigatório' })
    .min(6, { message: 'Senha deve conter ao menos 6 caracteres' })
    .trim(),
})

export type SignUpType = z.infer<typeof signupSchema>
