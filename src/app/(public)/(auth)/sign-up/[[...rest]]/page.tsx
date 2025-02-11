'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signupAction } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type SignUpType, signupSchema } from '@/schemas/signup-schema'
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
  Loader2Icon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignUpType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignUpType) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await signupAction(data)
      toast.success('Usuário criado com sucesso')
    } catch (err) {
      toast.error('Erro ao criar usuário')
      console.error('❌ Erro ao criar usuário: ', err)
    } finally {
      form.reset()
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4 p-6 bg-card rounded-lg"
        >
          {/* TITLE */}
          <header className="space-y-1">
            <h1 className="font-semibold text-xl text-foreground tracking-tight">
              Cadastre-se
            </h1>
            <p className="text-sm text-muted-foreground">
              Faça seu cadastro gratuitamente.
            </p>
          </header>

          {/* FULL NAME */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      size="icon"
                      type="button"
                      variant="ghost"
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      {!showPassword && <EyeIcon />}
                      {showPassword && <EyeClosedIcon />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {/* LOADING */}
            {!form.formState.isSubmitting && (
              <>
                <span>Cadastrar</span>
                <ArrowRightIcon className="size-4 shrink-0" />
              </>
            )}

            {/* DEFAULT */}
            {form.formState.isSubmitting && (
              <Loader2Icon className="size-4 shrink-0 animate-spin" />
            )}
          </Button>
        </form>
      </Form>

      {/* LINK */}
      <p className="text-sm text-center text-muted-foreground">
        Já possui uma conta?{' '}
        <Link href="/sign-in" className="text-foreground hover:underline">
          Faça seu login.
        </Link>
      </p>
    </>
  )
}

export default SignUpPage
