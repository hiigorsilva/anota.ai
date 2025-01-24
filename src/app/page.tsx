import { ContainerApp } from '@/components/container-app'
import { TaskForm } from '@/components/form/task-form'
import { Navbar } from '@/components/navbar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Home = async () => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/sign-in')
  }

  return (
    <div className="flex flex-col min-h-dvh h-full w-full">
      <Navbar />

      <ContainerApp className="flex flex-col flex-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full min-h-full flex-1 rounded-md border"
        >
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <div className="h-full flex flex-col justify-center gap-4 p-5">
                  <Card className="bg-transparent border-none">
                    <CardHeader>
                      <CardTitle>Crie uma nova tarefa</CardTitle>
                      <CardDescription>
                        Descreva o que é sua tarefa
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TaskForm />
                    </CardContent>
                  </Card>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Chart Area</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <div className="flex h-[200px] items-center justify-center p-6">
              <span className="font-semibold">Task List Area</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ContainerApp>
    </div>
  )
}

export default Home
