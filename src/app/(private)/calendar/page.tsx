import { getAllTasksAction } from '@/actions/task'
import { ContainerApp } from '@/components/container-app'
import { Navbar } from '@/components/navbar'
import {} from '@/components/title-page'
import { Calendar } from './components/calendar'

export const dynamic = 'force-dynamic'

const CalendarPage = async () => {
  const tasks = await getAllTasksAction()

  return (
    <div className="flex flex-col gap-6 min-h-dvh h-full w-full">
      <Navbar />
      <ContainerApp className="flex flex-col flex-1 gap-6">
        <Calendar tasks={tasks} />
      </ContainerApp>
    </div>
  )
}

export default CalendarPage
