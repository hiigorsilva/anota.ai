'use client'

import { createTaskAction } from '@/actions/task'
import { statusOptions } from '@/data/task/status-options'
import { cn } from '@/lib/utils'
import { type TaskFormType, taskFormSchema } from '@/schemas/task-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, PlusCircleIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
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
      deadline: new Date(),
    },
  })

  const onSubmit = async (data: TaskFormType) => {
    try {
      const task = await createTaskAction(data)
      if (!task.success) {
        toast.error(task.message)
        return
      }
      toast.success(task.message)
    } catch (err) {
      console.error('❌ CREATE_TASK_ERROR', err)
      toast.error('Ops! Houve um erro. Tente novamente mais tarde')
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

        <div className="w-full flex justify-between items-center gap-2">
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
                          <StatusSelectItem
                            key={option.label}
                            option={option}
                          />
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* DEADLINE DATE */}
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="w-full space-y-0">
                <FormLabel className="sr-only">Data de conclusão</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date < new Date()}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

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
