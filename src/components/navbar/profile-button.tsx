import { currentUser } from '@clerk/nextjs/server'
import { LogOutIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { ToggleTheme } from '../toggle-theme'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { LinkRow } from './link-row'
import { navLinks } from './links'

type Props = {
  children: ReactNode
}
export const ProfileButton = async ({ children }: Props) => {
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Olá, {user.firstName} 😉</SheetTitle>
          <SheetDescription>Teste</SheetDescription>
        </SheetHeader>

        <Separator />

        <nav className="flex flex-col gap-1">
          {navLinks.map(link => (
            <Button
              key={link.name}
              variant="ghost"
              className="justify-start"
              asChild
            >
              <LinkRow link={link} />
            </Button>
          ))}
        </nav>

        <div className="space-y-4 mt-auto">
          <Separator />

          <div className="flex justify-between items-center gap-4 flex-wrap">
            <Button
              variant="ghost"
              className="justify-start text-rose-500 dark:text-rose-400"
            >
              <LogOutIcon className="text-rose-500 dark:text-rose-400 size-4 shrink-0" />
              Sair
            </Button>

            <ToggleTheme />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
