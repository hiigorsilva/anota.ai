import { StatusLabel } from '@/components/task/task-status-label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatTime } from '@/utils/format-time'
import type { Task } from '@prisma/client'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  task: Task
}

export const TaskTitleCalendar = ({ children, task }: Props) => {
  const colorLabelTitle =
    task.status === 'Cancelado' ? 'line-through text-red-500' : ''

  return (
    <Dialog>
      {/* TODO: Resolver BUG ao clicar no título / abrir modal de edição */}
      <DialogTrigger asChild className={`hover:underline ${colorLabelTitle}`}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6">
        <DialogHeader className="space-y-3">
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription className="flex justify-between items-center gap-6">
            <span className="text-sm">
              Atualizado {formatTime(task.updatedAt)}
            </span>
            <StatusLabel status={task.status} />
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
