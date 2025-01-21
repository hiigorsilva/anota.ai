import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export const ContainerApp = ({ children, className }: Props) => {
  return (
    <div className={cn('h-full max-w-7xl w-full mx-auto px-5', className)}>
      {children}
    </div>
  )
}
