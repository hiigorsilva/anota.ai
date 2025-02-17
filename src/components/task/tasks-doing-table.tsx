import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatTime } from '@/utils/format-time'
import type { Task } from '@prisma/client'
import { NotebookPenIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog'
import { DeleteTaskButton } from './delete-task-button'
import { EditTaskDialog } from './edit-task-dialog'
import { StatusLabel } from './task-status-label'
import { TaskTitleModal } from './task-title-modal'

type Props = {
  tasksDoing: Task[] | null
}

export const TaskDoingTable = async ({ tasksDoing }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-36 text-nowrap">Adicionado</TableHead>
          <TableHead className="min-h-64 flex-1 text-nowrap">
            Título da tarefa
          </TableHead>
          <TableHead className="w-40 text-nowrap">Status</TableHead>
          <TableHead className="w-10 text-nowrap">{''}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasksDoing &&
          tasksDoing.map(task => <TaskDoingItem key={task.id} task={task} />)}

        {tasksDoing?.length === 0 && <TaskDoingNotFound />}
      </TableBody>
    </Table>
  )
}

export const TaskDoingItem = ({ task }: { task: Task }) => {
  const colorLabelRow =
    task.status === 'Cancelado' || task.status === 'Concluído'
      ? 'text-muted-foreground'
      : ''

  return (
    <TableRow className={`text-nowrap ${colorLabelRow}`}>
      {/* DATA */}
      <TableCell className="capitalize">{formatTime(task.createdAt)}</TableCell>

      {/* TÍTULO DA TAREFA */}
      <TableCell>
        <TaskTitleModal task={task} />
      </TableCell>

      {/* STATUS */}
      <TableCell>
        <StatusLabel status={task.status} />
      </TableCell>

      {/* ACTION */}
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
  )
}

export const TaskDoingNotFound = () => {
  return (
    <TableRow>
      <TableCell colSpan={4}>
        <div className="flex flex-col items-center gap-3 text-muted-foreground py-16">
          <NotebookPenIcon
            strokeWidth={1.5}
            className="text-muted-foreground size-8"
          />
          Nenhuma tarefa em andamento
        </div>
      </TableCell>
    </TableRow>
  )
}
