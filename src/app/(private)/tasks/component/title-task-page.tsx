'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const TitleTaskPage = ({ search }: { search?: string }) => {
  const route = useRouter()
  const handlePrevPage = () => {
    const prevPage = search ? '/tasks' : '/'
    route.push(prevPage)
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handlePrevPage} size="icon" variant="ghost">
        <ArrowLeftIcon className="text-muted-foreground size-4 shrink-0" />
      </Button>

      <h1 className="font-semibold text-xl text-foreground tracking-tight">
        {search && (
          <>
            Você está buscando por:{' '}
            <span className="text-muted-foreground">{search}</span>
          </>
        )}
        {!search && <span>Todas as tarefas</span>}
      </h1>
    </div>
  )
}
