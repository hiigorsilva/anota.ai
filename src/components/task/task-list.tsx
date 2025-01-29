import { getTaskAction } from '@/actions/task/get-task'
import { getStatusColor } from '@/data/task/status-options'
import { formatDate } from '@/utils/date-format'
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
          <TableHead>Data</TableHead>
          <TableHead>Título da tarefa</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks &&
          tasks.map(task => (
            <TableRow
              key={task.id}
              className={
                task.status === 'Cancelado' || task.status === 'Concluído'
                  ? 'text-muted-foreground'
                  : ''
              }
            >
              <TableCell className="capitalize">
                {formatDate(task.createdAt)}
              </TableCell>
              <TableCell
                className={
                  task.status === 'Cancelado' || task.status === 'Concluído'
                    ? 'line-through'
                    : ''
                }
              >
                {task.title}
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
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
