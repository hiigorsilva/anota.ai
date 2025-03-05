import { Toaster } from '@/components/ui/sonner'
import type { ReactNode } from 'react'
import { AuthProvider } from './auth'
import { ToggleThemeProvider } from './theme'

type Props = {
  children: ReactNode
}

export const RootProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <ToggleThemeProvider>
        <>
          {children}
          <Toaster richColors />
        </>
      </ToggleThemeProvider>
    </AuthProvider>
  )
}
