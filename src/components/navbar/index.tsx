import { getUserAction } from '@/actions/user'
import { MenuIcon } from 'lucide-react'
import { ContainerApp } from '../container-app'
import { Search } from '../search'
import { Button } from '../ui/button'
import { ProfileButtonSheet } from './profile-button-sheet'
import { TeamSwitcher } from './team-switcher'

export const Navbar = async () => {
  const user = await getUserAction()

  return (
    <header className="flex items-center min-h-16 h-fit w-full">
      <ContainerApp className="flex justify-between items-center gap-8">
        <TeamSwitcher />

        <div className="flex items-center gap-4">
          <Search className="w-fit" />

          {/* PROFILE BUTTON */}
          <ProfileButtonSheet user={user}>
            <Button variant="outline" size="icon">
              <MenuIcon className="size-6 shrink-0" />
            </Button>
          </ProfileButtonSheet>
        </div>
      </ContainerApp>
    </header>
  )
}
