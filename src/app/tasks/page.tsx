import { getTaskAction } from '@/actions/task/get-task'
import { ContainerApp } from '@/components/container-app'
import { Navbar } from '@/components/navbar'
import { TaskListTable } from '@/components/task/task-list-table'

const TasksPage = async () => {
  const tasks = await getTaskAction()
  if (!tasks) {
    return null
  }

  return (
    <div className="flex flex-col min-h-dvh h-full w-full">
      <Navbar />

      <ContainerApp className="flex flex-col flex-1">
        <TaskListTable tasks={tasks} />
      </ContainerApp>
    </div>
  )
}

export default TasksPage
