'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MONTHS_OF_YEAR } from '../data/months'

type SelectMonthCalendarProps = {
  month: number
  setMonth: (year: number) => void
}

export const SelectMonthCalendar = ({
  month,
  setMonth,
}: SelectMonthCalendarProps) => {
  const handleSelectedMonth = (index: number) => {
    setMonth(index)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="secondary" className="min-w-20 w-fit">
          {MONTHS_OF_YEAR[month] ?? 'Selecione o mês'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit flex flex-col gap-1 p-1">
        {MONTHS_OF_YEAR.map((month, index) => (
          <Button
            key={month}
            variant="ghost"
            onClick={() => handleSelectedMonth(index)}
            className="justify-start"
          >
            {month}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
