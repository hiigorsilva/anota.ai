'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signinAction } from '@/actions/auth'
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
import { type SignInType, signinSchema } from '@/schemas/signin-schema'
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
  Loader2Icon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInType) => {
    try {
      await signinAction(data)
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
          <header>
            <h1 className="font-semibold text-xl text-foreground tracking-tight">
              Faça seu login
            </h1>
          </header>

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
                <span>Entrar</span>
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
        Ainda não possui uma conta?{' '}
        <Link href="/sign-up" className="text-foreground hover:underline">
          Faça seu cadastro.
        </Link>
      </p>
    </>
  )
}

export default SignInPage
