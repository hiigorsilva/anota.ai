import { getTaskAction } from '@/actions/task/get-task'
import { getStatusColor } from '@/data/task/status-options'
import { formatTime } from '@/utils/format-time'
import { NotebookPenIcon } from 'lucide-react'
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
import { Separator } from '../ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { DeleteTaskButton } from './delete-task-button'
import { EditTaskDialog } from './edit-task-dialog'

export const TaskList = async () => {
  const tasks = await getTaskAction()

  return (
    <Table>
      {!tasks && (
        <TableCaption className="py-8">
          <NotebookPenIcon
            strokeWidth={1.5}
            className="text-muted-foreground mb-2 size-6"
          />
          Nenhuma tarefa cadastrada.
        </TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className="w-36 text-nowrap">Data</TableHead>
          <TableHead className="min-h-64 flex-1 text-nowrap">
            Título da tarefa
          </TableHead>
          <TableHead className="w-40 text-nowrap">Status</TableHead>
          <TableHead className="w-10 text-nowrap">{''}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks &&
          tasks.map(task => (
            <TableRow
              key={task.id}
              className={`text-nowrap ${
                task.status === 'Cancelado' || task.status === 'Concluído'
                  ? 'text-muted-foreground'
                  : ''
              }`}
            >
              <TableCell className="lowercase">
                {formatTime(task.createdAt)}
              </TableCell>
              <TableCell className="min-h-64 text-nowrap">
                <Dialog>
                  {/* TODO: Resolver BUG ao clicar no título / abrir modal de edição */}
                  <DialogTrigger
                    className={`hover:underline ${
                      task.status === 'Cancelado' || task.status === 'Concluído'
                        ? 'line-through'
                        : ''
                    }`}
                  >
                    {task.title}
                  </DialogTrigger>
                  <DialogContent className="flex flex-col gap-6">
                    <DialogHeader className="space-y-3">
                      <DialogTitle>{task.title}</DialogTitle>
                      <DialogDescription className="flex justify-between items-center gap-6">
                        <span className="text-sm">
                          Atualizado {formatTime(task.updatedAt)}
                        </span>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-2 font-normal"
                        >
                          <div
                            className="size-2.5 rounded-full"
                            style={{
                              backgroundColor: getStatusColor(task.status),
                            }}
                          />
                          {task.status}
                        </Badge>
                      </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  />
                  {task.status}
                </div>
              </TableCell>

              <TableCell>
                <EditTaskDialog currentTask={task}>
                  <DialogClose asChild>
                    <Button variant="secondary" className="w-full">
                      Cancelar
                    </Button>
                  </DialogClose>
                </EditTaskDialog>
                <DeleteTaskButton task={task} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
