import { searchTaskAction } from '@/actions/search/task'
import { ContainerApp } from '@/components/container-app'
import { Navbar } from '@/components/navbar'
import { TaskListTable } from '@/components/task/task-list-table'

type Props = {
  params: {
    searchTask: string
  }
}

const SearchTaskPage = async ({ params }: Props) => {
  const { searchTask } = params

  const search = await searchTaskAction(searchTask)
  if (!search) {
    return null
  }

  return (
    <div className="flex flex-col min-h-dvh h-full w-full">
      <Navbar />
      <ContainerApp className="flex flex-col flex-1">
        <TaskListTable tasks={search} />
      </ContainerApp>
    </div>
  )
}

export default SearchTaskPage
