'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

export const TitlePageRoot = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>
}

export const TitlePageIcon = ({ children }: { children: ReactNode }) => {
  const route = useRouter()

  const handlePrevPage = () => {
    const prevPage = '/'
    route.push(prevPage)
  }

  return (
    <Button onClick={handlePrevPage} size="icon" variant="ghost">
      {children}
    </Button>
  )
}

export const TitlePageText = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="font-semibold text-xl text-foreground tracking-tight">
      {children}
    </h1>
  )
}
