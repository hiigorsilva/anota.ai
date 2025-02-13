import { getTaskAction } from '@/actions/(antigo)/task'
import { ContainerApp } from '@/components/container-app'
import { AddTaskFormModal } from '@/components/form/add-task-modal'
import { Navbar } from '@/components/navbar'
import { DeleteAllTaskButton } from '@/components/task/delete-all-task-button'
import { TaskListTable } from '@/components/task/task-list-table'
import { PlusIcon } from 'lucide-react'

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

          <div className="flex items-center gap-2">
            {/* MODAL */}
            <AddTaskFormModal>
              <PlusIcon className="size-4 shrink-0" />
              Adicionar
            </AddTaskFormModal>
            <DeleteAllTaskButton />
          </div>
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
