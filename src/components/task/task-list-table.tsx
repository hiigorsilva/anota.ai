import { formatTime } from '@/utils/format-time'
import type { Task } from '@prisma/client'
import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { DeleteTaskButton } from './delete-task-button'
import { EditTaskDialog } from './edit-task-dialog'
import { StatusLabel } from './task-status-label'
import { TaskTitleModal } from './task-title-modal'

type Props = {
  tasks: Task[]
}

export const TaskListTable = async ({ tasks }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-36 text-nowrap">Adicionado</TableHead>
          <TableHead className="min-h-64 flex-1 text-nowrap">
            Título da tarefa
          </TableHead>
          <TableHead className="w-40 text-nowrap">Status</TableHead>
          <TableHead className="w-40 text-nowrap">Atualizado</TableHead>
          <TableHead className="w-10 text-nowrap">{''}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks && tasks.map(task => <TaskTableRow key={task.id} task={task} />)}
      </TableBody>
    </Table>
  )
}

const TaskTableRow = ({ task }: { task: Task }) => {
  const colorLabelRow =
    task.status === 'Cancelado' || task.status === 'Concluído'
      ? 'text-muted-foreground'
      : ''

  return (
    <TableRow key={task.id} className={`text-nowrap ${colorLabelRow}`}>
      <TableCell className="capitalize">{formatTime(task.createdAt)}</TableCell>
      <TableCell className="min-h-64 text-nowrap">
        <TaskTitleModal task={task} />
      </TableCell>
      <TableCell>
        <StatusLabel status={task.status} />
      </TableCell>

      <TableCell className="lowercase">{formatTime(task.updatedAt)}</TableCell>

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
