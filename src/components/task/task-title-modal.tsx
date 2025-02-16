import { formatTime } from '@/utils/format-time'
import type { Task } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { StatusLabel } from './status-label'

type Props = {
  task: Task
}

export const TaskTitleModal = ({ task }: Props) => {
  const colorLabelTitle = task.status === 'Cancelado' ? 'text-red-500' : ''

  return (
    <Dialog>
      {/* TODO: Resolver BUG ao clicar no título / abrir modal de edição */}
      <DialogTrigger className={`hover:underline ${colorLabelTitle}`}>
        {task.title}
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
