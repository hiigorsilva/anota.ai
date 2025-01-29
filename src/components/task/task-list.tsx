import { getTaskAction } from '@/actions/task/get-task'
import { getStatusColor } from '@/data/task/status-options'
import { formatDate } from '@/utils/date-format'
import { PencilIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
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

export const TaskList = async () => {
  const tasks = await getTaskAction()

  return (
    <Table>
      {!tasks && <TableCaption>Nenhuma tarefa cadastrada.</TableCaption>}
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
              <TableCell className="capitalize">
                {formatDate(task.createdAt)}
              </TableCell>
              <TableCell className="min-h-64 text-nowrap">
                <Dialog>
                  <DialogTrigger
                    className={
                      task.status === 'Cancelado' || task.status === 'Concluído'
                        ? 'line-through'
                        : ''
                    }
                  >
                    {task.title}
                  </DialogTrigger>
                  <DialogContent className="flex flex-col gap-6">
                    <DialogHeader className="space-y-3">
                      <DialogTitle>{task.title}</DialogTitle>
                      <DialogDescription className="flex justify-between items-center gap-6">
                        <span>Atualizado em {formatDate(task.updatedAt)}</span>
                        <span className="flex items-center gap-2">
                          <div
                            className="size-2.5 rounded-full"
                            style={{
                              backgroundColor: getStatusColor(task.status),
                            }}
                          />
                          {task.status}
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div>
                      <p className="text-muted-foreground">
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
                <Button size="icon" variant="ghost">
                  <PencilIcon className="size-4 shrink-0" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
