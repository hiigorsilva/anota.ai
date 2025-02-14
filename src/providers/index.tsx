import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { ReactNode } from 'react'
import { AuthProvider } from './auth'

type Props = {
  children: ReactNode
}

export const RootProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <>
          {children}
          <Toaster richColors />
        </>
      </ThemeProvider>
    </AuthProvider>
  )
}
