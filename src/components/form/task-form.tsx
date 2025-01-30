'use client'

import { createTaskAction } from '@/actions/task/create-task'
import { statusOptions } from '@/data/task/status-options'
import { type TaskFormType, taskFormSchema } from '@/schemas/task-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PlusCircleIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { StatusSelectItem } from './status-select-item'

type Props = {
  children: ReactNode
  setOpen: (open: boolean) => void
}

export const TaskForm = ({ children, setOpen }: Props) => {
  const form = useForm<TaskFormType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      status: 'Pendente',
      description: '',
    },
  })

  const onSubmit = async (task: TaskFormType) => {
    try {
      await createTaskAction(task)
      toast.success('Tarefa adicionada com sucesso')
    } catch (err) {
      toast.error('Erro ao adicionar tarefa')
      console.error('❌ Erro ao adicionar tarefa: ', err)
    } finally {
      setOpen(false)
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-wrap items-center gap-6"
      >
        {/* TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="sr-only">Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da tarefa" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            const MAX_DESCRIPTION_LENGTH = 150

            return (
              <FormItem className="relative w-full space-y-1">
                <FormLabel className="sr-only">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Breve descrição da tarefa"
                    className="h-20 resize-none"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
                <Badge
                  variant="outline"
                  className={`absolute right-1.5 bottom-1.5 text-[.625rem] py-0 px-1.5 ${(field.value?.length || 0) > MAX_DESCRIPTION_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}
                >
                  {field.value?.length || 0} / {MAX_DESCRIPTION_LENGTH}
                </Badge>
              </FormItem>
            )
          }}
        />

        {/* STATUS */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormLabel className="sr-only">Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      {statusOptions.map(option => (
                        <StatusSelectItem key={option.label} option={option} />
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="w-full flex items-center gap-2">
          {/* CANCEL BUTTON */}
          {children}

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 shrink-0 animate-spin" />
                <span>Criando...</span>
              </>
            ) : (
              <>
                <PlusCircleIcon className="size-4 shrink-0" />
                <span>Criar tarefa</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
