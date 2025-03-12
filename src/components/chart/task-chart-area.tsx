import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { months } from '@/data/date/month'
import { Badge } from '../ui/badge'
import { TaskBarChart } from './task-bar-chart'

type CountTasks = {
  pending: number
  doing: number
  completed: number
  canceled: number
}

type TaskChartAreaProps = {
  countTasks: CountTasks | undefined
}

export const TaskChartArea = async ({ countTasks }: TaskChartAreaProps) => {
  if (!countTasks) {
    return null
  }

  const currentMonth = new Date().getMonth().toLocaleString()
  const currentYear = new Date().getFullYear().toLocaleString().replace('.', '')

  return (
    <Card className="w-full bg-transparent border-none">
      <CardHeader className="flex-row flex-wrap justify-between items-center gap-6 space-y-0 px-0">
        <CardTitle>Balanço mensal</CardTitle>
        <CardDescription>
          <Badge
            variant="secondary"
            className="font-normal text-sm text-muted-foreground bg-muted-foreground/5 hover:bg-muted-foreground/5"
          >
            {months.map(month =>
              month.indexMonth === currentMonth ? month.month : null
            )}
            {' de '}
            {currentYear}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <TaskBarChart countTasks={countTasks} />
      </CardContent>
    </Card>
  )
}
