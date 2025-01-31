'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

type Props = {
  countTasks: {
    pendding: number
    doing: number
    completed: number
    canceled: number
  }
}

export const TaskBarChart = ({ countTasks }: Props) => {
  const chartData = [
    { status: 'Pendente', count: countTasks.pendding, fill: '#9CA3AF' },
    { status: 'Fazendo', count: countTasks.doing, fill: '#FACC15' },
    { status: 'Concluído', count: countTasks.completed, fill: '#4ADE80' },
    { status: 'Cancelado', count: countTasks.canceled, fill: '#FB7185' },
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
