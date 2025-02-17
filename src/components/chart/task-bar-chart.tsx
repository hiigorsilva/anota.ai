'use client'

import { getStatusColor } from '@/data/task/status-options'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

type Props = {
  countTasks: {
    pending: number
    doing: number
    completed: number
    canceled: number
  }
}

export const TaskBarChart = ({ countTasks }: Props) => {
  const chartData = [
    {
      status: 'Pendente',
      count: countTasks.pending,
      fill: getStatusColor('Pendente'),
    },
    {
      status: 'Fazendo',
      count: countTasks.doing,
      fill: getStatusColor('Fazendo'),
    },
    {
      status: 'Concluído',
      count: countTasks.completed,
      fill: getStatusColor('Concluído'),
    },
    {
      status: 'Cancelado',
      count: countTasks.canceled,
      fill: getStatusColor('Cancelado'),
    },
  ]

  const chartConfig = {
    pendding: { label: 'Pendente' },
    doing: { label: 'Fazendo' },
    completed: { label: 'Concluído' },
    canceled: { label: 'Cancelado' },
  } as ChartConfig

  return (
    <ChartContainer config={chartConfig} className="min-w-72 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="status" tickLine={false} tickMargin={8} axisLine />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
