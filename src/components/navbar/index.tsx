import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ContainerApp } from '../container-app'
import { Search } from '../search'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { ProfileButtonSheet } from './profile-button-sheet'
import { TeamSwitcher } from './team-switcher'

export const Navbar = async () => {
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <header className="w-full h-16 border-b">
      <ContainerApp className="flex justify-between items-center gap-8">
        <TeamSwitcher />

        <div className="flex items-center gap-4">
          <Search className="w-fit" />

          {/* PROFILE BUTTON */}
          <ProfileButtonSheet>
            <Button variant="ghost">
              <Avatar className="size-8">
                <AvatarImage
                  src={
                    user.imageUrl ||
                    `http://avatar.vercel.sh/${user.firstName}.png`
                  }
                  alt={user.fullName || 'Foto do usuário'}
                />
                <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </ProfileButtonSheet>
        </div>
      </ContainerApp>
    </header>
  )
}
