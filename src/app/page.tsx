import { getTaskCountByStatusAction } from '@/actions/task/get-task-count-by-status'
import { ContainerApp } from '@/components/container-app'
import { AddTaskFormModal } from '@/components/form/add-task-modal'
import { Navbar } from '@/components/navbar'
import { TaskList } from '@/components/task/task-list'
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
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Home = async () => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/sign-in')
  }

  const countTasks = await getTaskCountByStatusAction()
  console.log('COUNT TASKS: ', countTasks)

  return (
    <div className="flex flex-col min-h-dvh h-full w-full">
      <Navbar />

      <ContainerApp className="flex flex-col flex-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full min-h-full flex-1 rounded-md border"
        >
          {/* LEFT */}
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              {/* ADD TASKS */}
              <ResizablePanel defaultSize={50}>
                <div className="h-full flex flex-col gap-4 p-5">
                  <Card className="bg-transparent border-none">
                    <CardHeader className="pt-0 px-0">
                      <CardTitle>Crie uma nova tarefa</CardTitle>
                      <CardDescription>
                        Clique no botão abaixo para criar uma nova tarefa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      {/* MODAL */}
                      <AddTaskFormModal />
                    </CardContent>
                  </Card>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* CHART */}
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6">
                  {/* <TaskChart /> */}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* RIGHT */}
          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col gap-4 p-5">
              <Card className="bg-transparent border-none">
                <CardHeader className="pt-0 px-0">
                  <CardTitle>Últimas tarefas criadas</CardTitle>
                  <CardDescription>
                    Conclua todas e garanta a produtividade do dia.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <TaskList />
                </CardContent>
                <CardFooter className="text-sm justify-center">
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
