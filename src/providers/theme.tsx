import { ThemeProvider } from '@/components/theme-provider'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ToggleThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
