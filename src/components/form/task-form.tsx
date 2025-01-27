'use client'

import { createTaskAction } from '@/actions/task'
import { statusOptions } from '@/data/task/status-options'
import { type TaskFormType, taskFormSchema } from '@/schemas/task-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircleIcon } from 'lucide-react'
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

export const TaskForm = () => {
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
      // console.log(task)
      toast.success('Tarefa adicionada com sucesso')
    } catch (err) {
      toast.error('Erro ao adicionar tarefa')
      console.error('❌ Erro ao adicionar tarefa: ', err)
    } finally {
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-wrap items-center gap-2"
      >
        <div className="w-full flex items-center gap-2">
          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative w-full space-y-0">
                <FormLabel className="sr-only">Título</FormLabel>
                <FormMessage className="absolute -top-5 text-xs" />
                <FormControl>
                  <Input placeholder="Título" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* STATUS */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="min-w-36 w-fit">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
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

          {/* SUBMIT */}
          <Button type="submit">
            <PlusCircleIcon className="size-4 shrink-0" />
            Adicionar
          </Button>
        </div>

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            const MAX_DESCRIPTION_LENGTH = 150

            return (
              <FormItem className="w-full flex flex-col gap-2 space-y-0">
                <FormLabel className="sr-only">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Descreva sua tarefa"
                    className="resize-none"
                  />
                </FormControl>
                <div className="flex items-center justify-between gap-4">
                  <FormMessage className="text-xs" />
                  <Badge
                    variant="outline"
                    className={`ml-auto text-[.625rem] ${(field.value?.length || 0) > MAX_DESCRIPTION_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}
                  >
                    {field.value?.length || 0} / {MAX_DESCRIPTION_LENGTH}
                  </Badge>
                </div>
              </FormItem>
            )
          }}
        />
      </form>
    </Form>
  )
}
