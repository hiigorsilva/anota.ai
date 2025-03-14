'use client'

import { cn } from '@/lib/utils'
import { type SearchType, searchSchema } from '@/schemas/search-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'

type Props = {
  className?: string
}

export const Search = ({ className }: Props) => {
  const form = useForm<SearchType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const openSearchDialog = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', openSearchDialog)
    return () => document.removeEventListener('keydown', openSearchDialog)
  }, [])

  const onSearchSubmit = (data: SearchType) => {
    const params = new URLSearchParams(searchParams.toString()) // Mantém outros params da URL
    params.set('search', data.search) // Adiciona o termo de pesquisa

    router.push(`/tasks?${params.toString()}`)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild className={cn('w-full', className)}>
        <Button
          variant="outline"
          className="justify-between gap-3 text-muted-foreground"
        >
          <SearchIcon className="text-muted-foreground size-4 shrink-0" />
          <span>Buscar tarefas</span>
          <span className="flex justify-center items-center gap-2 font-semibold uppercase w-fit px-2 h-full rounded-sm bg-muted-foreground/10">
            /
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buscar tarefas</DialogTitle>
          <DialogDescription>
            Pesquise pelo título ou descrição da tarefa que deseja.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSearchSubmit)}
            className="flex items-center gap-4"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="relative w-full space-y-0">
                  <FormLabel className="sr-only">Buscar</FormLabel>
                  <FormControl>
                    <Input
                      type="search"
                      autoComplete="off"
                      autoFocus
                      placeholder="Ex: Fazer compras..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Buscar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
