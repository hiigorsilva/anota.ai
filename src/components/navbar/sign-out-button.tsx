'use client'
import { logoutAction } from '@/actions/auth'
import { LogOutIcon } from 'lucide-react'
import { Button } from '../ui/button'

export const SignOutButton = () => {
  const handleSignOut = async () => {
    await logoutAction()
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
