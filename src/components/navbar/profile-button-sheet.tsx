'use client'

import type { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { type ReactNode, useState } from 'react'
import { ToggleTheme } from '../toggle-theme'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
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
import { SignOutButton } from './sign-out-button'

type Props = {
  user: User | null
  children: ReactNode
}
export const ProfileButtonSheet = ({ user, children }: Props) => {
  const [open, setOpen] = useState(false)

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Avatar className="size-12 shrink-0">
            <AvatarImage
              src={user.image ?? `http://avatar.vercel.sh/${user.name}.png`}
              alt="Avatar do usuário"
            />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <SheetHeader>
            <SheetTitle className="leading-none">
              Olá, {user.name ?? 'Bem vindo'} 😉
            </SheetTitle>
            <SheetDescription>
              <span className="w-fit text-xs text-muted-foreground bg-foreground/10 px-2.5 py-0.5 rounded-full">
                {user.email ?? ''}
              </span>
            </SheetDescription>
          </SheetHeader>
        </div>

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
            {/* SIGN OUT BUTTON */}
            <SignOutButton />

            {/* THEME BUTTON */}
            <ToggleTheme />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
