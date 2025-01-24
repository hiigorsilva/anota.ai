'use client'

import { statusOptions } from '@/data/task/status-options'
import { type TaskFormType, taskFormSchema } from '@/schemas/task-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
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

  const onSubmit = (data: TaskFormType) => {
    try {
      toast.success('Tarefa adicionada com sucesso')
      console.log(data)
    } catch (err) {
      toast.error('Ocorreu um erro ao adicionar sua tarefa')
      console.error(err)
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
              <FormItem className="w-full space-y-0">
                <FormLabel className="sr-only">Título</FormLabel>
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
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormLabel className="sr-only">Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva sua tarefa" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
