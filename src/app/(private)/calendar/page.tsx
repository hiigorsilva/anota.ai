import { getAllTasksAction } from '@/actions/task'
import { ContainerApp } from '@/components/container-app'
import { Navbar } from '@/components/navbar'
import { Calendar } from './components/calendar'

const CalendarPage = async () => {
  const tasks = await getAllTasksAction()

  return (
    <div className="flex flex-col gap-6 min-h-dvh h-full w-full">
      <Navbar />
      <ContainerApp className="flex flex-col flex-1">
        <Calendar tasks={tasks} />
      </ContainerApp>
    </div>
  )
}

export default CalendarPage
