'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type SelectYearCalendarProps = {
  year: number
  setYear: (year: number) => void
  currentDate: Date
}

export const SelectYearCalendar = ({
  year,
  setYear,
  currentDate,
}: SelectYearCalendarProps) => {
  const handleSelectedYear = (selectYear: number) => {
    setYear(selectYear)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="secondary" className="min-w-20 w-fit">
          {year ?? 'Selecione o ano'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit flex flex-col gap-1 p-1">
        {/* PREV YEARS */}
        {Array.from({ length: 5 }).map((_, index) => {
          const selectYear = currentDate.getFullYear() - (6 - (index + 1))
          return (
            <Button
              variant="ghost"
              key={index}
              onClick={() => handleSelectedYear(selectYear)}
            >
              {selectYear}
            </Button>
          )
        })}

        {/* CURRENT YEAR */}
        <Button
          variant="ghost"
          onClick={() => setYear(currentDate.getFullYear())}
        >
          {currentDate.getFullYear()}
        </Button>

        {/* NEXT YEARS */}
        {Array.from({ length: 5 }).map((_, index) => {
          const selectYear = currentDate.getFullYear() + (index + 1)
          return (
            <Button
              variant="ghost"
              key={index}
              onClick={() => handleSelectedYear(selectYear)}
            >
              {selectYear}
            </Button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
