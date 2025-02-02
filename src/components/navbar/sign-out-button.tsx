'use client'

import { useClerk } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import { Button } from '../ui/button'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    await signOut({
      redirectUrl: '/sign-in',
    })
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="ghost"
      className="justify-start text-rose-500 dark:text-rose-400"
    >
      <LogOutIcon className="text-rose-500 dark:text-rose-400 size-4 shrink-0" />
      Sair
    </Button>
  )
}
