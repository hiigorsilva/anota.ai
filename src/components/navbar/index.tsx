import { ContainerApp } from '../container-app'
import { Search } from '../search'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { ProfileButton } from './profile-button'
import { TeamSwitcher } from './team-switcher'

export const Navbar = () => {
  return (
    <header className="w-full h-16 border-b">
      <ContainerApp className="flex justify-between items-center gap-8">
        <TeamSwitcher />

        <div className="flex items-center gap-4">
          <Search className="w-fit" />

          {/* PROFILE BUTTON */}
          <ProfileButton>
            <Button variant="ghost">
              <Avatar className="size-8">
                <AvatarImage
                  src="http://avatar.vercel.sh/higor.png"
                  alt="Higor Silva"
                />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
            </Button>
          </ProfileButton>
        </div>
      </ContainerApp>
    </header>
  )
}
