import { getTaskAction } from '@/actions/task/get-task'
import { ContainerApp } from '@/components/container-app'
import { Navbar } from '@/components/navbar'
import { DeleteAllTaskButton } from '@/components/task/delete-all-task-button'
import { TaskListTable } from '@/components/task/task-list-table'

const TasksPage = async () => {
  const tasks = await getTaskAction()
  if (!tasks) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 min-h-dvh h-full w-full">
      <Navbar />

      <ContainerApp className="flex flex-col flex-1 gap-6">
        {/* TITLE PAGE */}
        <div className="flex justify-between items-center gap-6">
          <h1 className="font-semibold text-xl text-foreground tracking-tight">
            Minhas tarefas
          </h1>

          <DeleteAllTaskButton />
        </div>

        {/* TASKS TABLE */}
        <div className="border rounded-md">
          <TaskListTable tasks={tasks} />
        </div>
      </ContainerApp>
    </div>
  )
}

export default TasksPage
