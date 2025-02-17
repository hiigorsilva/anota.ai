import { getAllTasksAction, getSearchTasksAction } from '@/actions/task'
import { ContainerApp } from '@/components/container-app'
import { AddTaskFormModal } from '@/components/form/add-task-modal'
import { Navbar } from '@/components/navbar'
import { DeleteAllTaskButton } from '@/components/task/delete-all-task-button'
import { TaskListTable } from '@/components/task/task-list-table'
import { NotebookIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { TitleTaskPage } from './component/title-task-page'

type Props = {
  searchParams: {
    search?: string
  }
}

const TasksPage = async ({ searchParams }: Props) => {
  const { search } = searchParams

  const tasks = search
    ? await getSearchTasksAction(search)
    : await getAllTasksAction()

  return (
    <div className="flex flex-col gap-6 min-h-dvh h-full w-full">
      <Navbar />

      <ContainerApp className="flex flex-col flex-1 gap-6">
        {/* TITLE PAGE */}
        <div className="flex justify-between items-center gap-6">
          <TitleTaskPage search={search} />

          <div className="flex items-center gap-2">
            {/* MODAL */}
            <AddTaskFormModal>
              <PlusIcon className="size-4 shrink-0" />
              Adicionar
            </AddTaskFormModal>
            {!search && <DeleteAllTaskButton />}
          </div>
        </div>

        {/* TASKS TABLE */}
        <div className="border rounded-md">
          {tasks && <TaskListTable tasks={tasks} />}

          {/* TASKS NOT FOUND */}
          {!tasks ||
            (tasks.length === 0 && (
              <div className="flex flex-col items-center gap-4 p-8 text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <NotebookIcon
                    strokeWidth={1}
                    className="text-muted-foreground size-8"
                  />
                  Nenhuma tarefa encontrada
                </div>

                <Link href="/tasks" className="text-sm hover:underline">
                  Ver todas as tarefas
                </Link>
              </div>
            ))}
        </div>
      </ContainerApp>
    </div>
  )
}

export default TasksPage
