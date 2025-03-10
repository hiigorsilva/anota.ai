'use client'
import { editUserAction } from '@/actions/user'
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
import {
  type EditSettingsType,
  editSettingsSchema,
} from '@/schemas/edit-settings-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@prisma/client'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type EditProfileFormProps = {
  user: User
}

export const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const form = useForm<EditSettingsType>({
    resolver: zodResolver(editSettingsSchema),
    defaultValues: {
      name: user.name ?? '',
      email: user.email ?? '',
    },
  })

  const onSubmitEditProfile = async (newData: EditSettingsType) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const user = await editUserAction(newData)

    if (!user.success) {
      toast.error(user.message)
      return
    }

    toast.success(user.message)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitEditProfile)}
        className="flex flex-wrap items-center gap-6"
      >
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex items-center gap-3 space-y-0">
              <FormLabel className="text-nowrap">Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
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
            <FormItem className="w-full flex items-center gap-3 space-y-0">
              <FormLabel className="text-nowrap">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nenhum email cadastrado"
                  readOnly
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="ml-auto"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              Salvando...
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            'Salvar alterações'
          )}
        </Button>
      </form>
    </Form>
  )
}
