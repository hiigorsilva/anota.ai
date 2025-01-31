import { getTaskCountByStatusAction } from '@/actions/task/get-task-count-by-status'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { months } from '@/data/date/month'
import { TaskBarChart } from './task-bar-chart'

export const TaskChartArea = async () => {
  const countTasks = await getTaskCountByStatusAction()
  if (!countTasks) return 0

  const currentMonth = new Date().getMonth().toLocaleString()
  const currentYear = new Date().getFullYear().toLocaleString().replace('.', '')

  return (
    <Card className="w-full bg-transparent border-none">
      <CardHeader className="px-0">
        <CardTitle>Balanço de tarefas</CardTitle>
        <CardDescription>
          Mês de{' '}
          {months.map(month =>
            month.indexMonth === currentMonth ? month.month : null
          )}
          {' de '}
          {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <TaskBarChart countTasks={countTasks} />
      </CardContent>
    </Card>
  )
}
