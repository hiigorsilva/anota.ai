'use client'
import { statusOptions } from '@/data/task/status-options'
import { type TaskFormType, taskFormSchema } from '@/schemas/task-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon, PencilIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { StatusSelectItem } from '../form/status-select-item'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
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
  task: TaskFormType
}

export const EditTaskDialog = ({ children, task }: Props) => {
  const form = useForm<TaskFormType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task.title,
      status: task.status,
      description: task.description,
    },
  })

  const onSubmit = async (_task: TaskFormType) => {
    try {
      // await editTaskAction(task)

      toast.success('Tarefa editada com sucesso')
    } catch (err) {
      toast.error('Erro ao editar tarefa')
      console.error('❌ Erro ao editar tarefa: ', err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" disabled>
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-8"
          >
            <div className="flex items-center gap-4">
              {/* TITLE */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="relative w-full space-y-0">
                    <FormLabel className="sr-only">Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da tarefa" {...field} />
                    </FormControl>
                    <FormMessage className="absolute left-0 -bottom-5 text-xs" />
                  </FormItem>
                )}
              />

              {/* STATUS */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="min-w-40 w-fit space-y-0">
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
            </div>

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                const MAX_DESCRIPTION_LENGTH = 150

                return (
                  <FormItem className="relative w-full flex-1 space-y-1">
                    <FormLabel className="sr-only">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Breve descrição da tarefa"
                        className="h-20 resize-none"
                      />
                    </FormControl>
                    <FormMessage className="absolute left-0 -bottom-5 text-xs" />
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

            <div className="w-full flex items-center gap-2">
              {/* CANCEL BUTTON */}
              {children}

              {/* SUBMIT BUTTON */}
              <DialogClose asChild>
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
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
