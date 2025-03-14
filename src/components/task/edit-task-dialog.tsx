'use client'

import { updateTaskAction } from '@/actions/task'
import { statusOptions } from '@/data/task/status-options'
import { type TaskFormType, taskFormSchema } from '@/schemas/task-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Task } from '@prisma/client'
import { Loader2Icon, PencilIcon } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { StatusSelectItem } from '../form/status-select-item'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
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
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

type Props = {
  children: ReactNode
  currentTask: Task
}

export const EditTaskDialog = ({ children, currentTask }: Props) => {
  const form = useForm<TaskFormType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: currentTask.title,
      status: currentTask.status,
      description: currentTask.description,
    },
  })

  const [open, setOpen] = useState(false)

  const onSubmitEditTask = async (newTask: TaskFormType) => {
    try {
      const updateTask = await updateTaskAction(currentTask, newTask)
      if (!updateTask.success) {
        toast.error(updateTask.message)
        return
      }

      toast.success(updateTask.message)
    } catch (err) {
      console.error('❌ UPDATE_TASK_ERROR', err)
      toast.error('Ops! Houve um erro. Tente novamente mais tarde')
    } finally {
      setOpen(false)
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PencilIcon className="text-muted-foreground size-4 shrink-0" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para editar.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitEditTask)}
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
                    <Loader2Icon className="size-4 shrink-0 animate-spin" />
                    <span>Editando...</span>
                  </>
                ) : (
                  <>
                    <PencilIcon className="size-4 shrink-0" />
                    <span>Editar tarefa</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
