'use client'
import {
  TitlePageIcon,
  TitlePageRoot,
  TitlePageText,
} from '@/components/title-page'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Task } from '@prisma/client'
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { DAYS_OF_WEEK } from '../data/week-days'
import { SelectMonthCalendar } from './select-month-calendar'
import { SelectYearCalendar } from './select-year-calendar'
import { TaskTitleCalendar } from './tastk-title-calendar'

type CalendarProps = {
  tasks: Task[] | null
}

export const Calendar = ({ tasks }: CalendarProps) => {
  if (!tasks) return null

  const currentDate = new Date()
  const [year, setYear] = useState(currentDate.getFullYear())
  const [month, setMonth] = useState(currentDate.getMonth())

  const [selectedDay, setSelectedDay] = useState(currentDate.getDate())
  const selectedDate = new Date(year, month, selectedDay)

  const firstDayOfMonth = startOfMonth(selectedDate)
  const lastDayOfMonth = endOfMonth(selectedDate)
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  })

  const startingDayIndex =
    getDay(firstDayOfMonth) < 0 ? 6 : getDay(firstDayOfMonth)
  const taskGroupedByDate = tasks.reduce(
    (acc: Record<string, Task[]>, task) => {
      const dateKey = format(task.createdAt, 'PPP', { locale: ptBR })
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(task)
      return acc
    },
    {}
  )

  return (
    <div className="w-full space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-6">
        <TitlePageRoot>
          <TitlePageIcon>
            <ArrowLeftIcon className="text-muted-foreground size-4 shrink-0" />
          </TitlePageIcon>
          <TitlePageText>Calendário de tarefas</TitlePageText>
        </TitlePageRoot>

        <div className="flex items-center gap-2">
          <span>Período</span>

          {/* MONTH */}
          <SelectMonthCalendar month={month} setMonth={setMonth} />

          {/* YEAR */}
          <SelectYearCalendar
            currentDate={currentDate}
            setYear={setYear}
            year={year}
          />
        </div>
      </header>

      {/* CALENDAR */}
      <div className="grid grid-cols-7 gap-2">
        {DAYS_OF_WEEK.map(day => (
          <strong key={day} className="w-full p-2 rounded">
            {day}
          </strong>
        ))}

        {/* INACTIVE DAYS */}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <Card
            key={index}
            className="min-h-40 rounded bg-secondary/25 border-none"
          />
        ))}

        {/* MONTH DAYS */}
        {daysInMonth.map(date => (
          <Card
            key={date.toISOString()}
            className="group min-h-40 bg-secondary space-y-3 p-1"
            onClick={() => setSelectedDay(date.getDate())}
          >
            {/* DATE AND BUTTON */}
            <div className="flex justify-between items-center gap-4">
              {/* DATE */}
              <div
                className={`w-8 h-8 grid place-content-center font-semibold text-xs rounded transition ${isToday(date) ? 'bg-primary text-background' : 'bg-card'}`}
              >
                {date.getDate()}
              </div>
            </div>

            <ScrollArea className="relative max-h-52 h-full p-0 ">
              {/* TASKS GROUPED BY DATE */}
              <div className="flex flex-1 flex-col justify-end gap-1">
                {(
                  taskGroupedByDate[format(date, 'PPP', { locale: ptBR })] || []
                ).map(task => (
                  <TaskTitleCalendar key={task.id} task={task}>
                    <div className="space-y-0.5 p-1 rounded bg-muted-foreground/15 border border-muted-foreground/25 backdrop-blur-sm transition-all cursor-pointer hover:brightness-125">
                      <h3 className="font-semibold text-sm leading-none truncate text-left p-0.5">
                        {task.title}
                      </h3>
                    </div>
                  </TaskTitleCalendar>
                ))}
              </div>
            </ScrollArea>
          </Card>
        ))}

        {/* INACTIVE DAYS */}
        {/* TODO: Adicionar os dias restantes (fora do mês atual) */}
      </div>
    </div>
  )
}
