import { UserButton } from '@clerk/nextjs'
import { ContainerApp } from '../container-app'
import { Logo } from '../logo'
import { ToggleTheme } from '../toggle-theme'
import { Separator } from '../ui/separator'
import { LinkRow } from './link-row'
import { navLinks } from './links'

export const Navbar = () => {
  return (
    <header className="w-full h-16 border-b">
      <ContainerApp className="flex justify-between items-center gap-8">
        <div className="flex items-center gap-8">
          <Logo className="scale-90" />

          <Separator orientation="vertical" />

          <nav className="w-fit flex justify-between items-center gap-8">
            {navLinks.map(link => (
              <LinkRow key={link.name} link={link} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ToggleTheme />
          <UserButton />
        </div>
      </ContainerApp>
    </header>
  )
}
