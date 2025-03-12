import { countTasksAction, getDoingTasksAction } from '@/actions/task'
import { TaskChartArea } from '@/components/chart/task-chart-area'
import { ContainerApp } from '@/components/container-app'
import { AddTaskFormModal } from '@/components/form/add-task-modal'
import { Navbar } from '@/components/navbar'
import { TaskDoingTable } from '@/components/task/tasks-doing-table'
import { TitlePageRoot, TitlePageText } from '@/components/title-page'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

const Home = async () => {
  const doingTaks = await getDoingTasksAction()
  const countTasks = await countTasksAction()

  return (
    <div className="flex flex-col gap-6 min-h-dvh h-full w-full">
      <Navbar />

      <ContainerApp className="flex flex-col flex-1 gap-6">
        <TitlePageRoot>
          <TitlePageText>Dashboard</TitlePageText>
        </TitlePageRoot>

        <ResizablePanelGroup
          direction="horizontal"
          className="w-full min-h-full flex-1 rounded-md border"
        >
          {/* LEFT */}
          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col gap-0 p-5">
              {/* ADD TASKS */}
              <Card className="bg-transparent border-none">
                <CardHeader className="pt-0 px-0">
                  <CardTitle>Crie uma nova tarefa</CardTitle>
                  <CardDescription className="sr-only">
                    Clique no botão abaixo para criar uma nova tarefa
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  {/* MODAL */}
                  <AddTaskFormModal>
                    <Button>
                      <PlusIcon className="size-4 shrink-0" />
                      Adicionar tarefa
                    </Button>
                  </AddTaskFormModal>
                </CardContent>
              </Card>

              {/* CHART */}
              <div className="flex flex-col h-full gap-6">
                <TaskChartArea countTasks={countTasks} />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT */}
          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col gap-4 p-5">
              <Card className="h-full flex flex-col bg-transparent border-none">
                <CardHeader className="pt-0 px-0">
                  <CardTitle>Tarefas em andamento</CardTitle>
                  <CardDescription className="sr-only">
                    Lista de tarefas em andamento.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 px-0">
                  <TaskDoingTable tasksDoing={doingTaks} />
                </CardContent>
                <CardFooter className="text-sm justify-center p-0">
                  <Button variant="link" size="sm" asChild>
                    <Link href="/tasks">Ver todas</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ContainerApp>
    </div>
  )
}

export default Home
