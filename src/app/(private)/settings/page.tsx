import { getUserAction } from '@/actions/user'
import { ContainerApp } from '@/components/container-app'
import { Navbar } from '@/components/navbar'
import {
  TitlePageIcon,
  TitlePageRoot,
  TitlePageText,
} from '@/components/title-page'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeftIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { EditProfileForm } from './components/edit-profile-form'

const SettingsPage = async () => {
  const user = await getUserAction()
  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <div className="flex flex-col gap-6 min-h-dvh h-full w-full">
      <Navbar />
      <ContainerApp className="flex flex-col flex-1 gap-6">
        <TitlePageRoot>
          <TitlePageIcon>
            <ArrowLeftIcon className="text-muted-foreground size-4 shrink-0" />
          </TitlePageIcon>
          <TitlePageText>Gerenciar perfil</TitlePageText>
        </TitlePageRoot>

        <Card className="flex flex-col md:flex-row justify-between">
          <CardHeader>
            <CardTitle>Meus dados</CardTitle>
            <CardDescription>Altere seus dados pessoais</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <EditProfileForm user={user} />
          </CardContent>
        </Card>
      </ContainerApp>
    </div>
  )
}

export default SettingsPage
