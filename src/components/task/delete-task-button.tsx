'use client'

import type { Task } from '@prisma/client'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

type Props = {
  task: Task
}

export const DeleteTaskButton = ({ task }: Props) => {
  const [open, setOpen] = useState(false)

  const handleRemoveTask = async () => {
    console.log(task)
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash2Icon className="text-rose-600 dark:text-rose-500 size-4 shrink-0" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja remover essa tarefa?</DialogTitle>
          <DialogDescription>Essa ação não pode ser desfeita</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleRemoveTask} variant="destructive">
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
