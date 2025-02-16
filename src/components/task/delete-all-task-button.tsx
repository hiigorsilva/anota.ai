'use client'

import { deleteAllTaskAction } from '@/actions/task'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
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

export const DeleteAllTaskButton = () => {
  const [open, setOpen] = useState(false)
  const handleDeleteAllTask = async () => {
    try {
      const deleteAllTasks = await deleteAllTaskAction()
      if (!deleteAllTasks.success) {
        toast.error(deleteAllTasks.message)
        return
      }

      toast.success(deleteAllTasks.message)
    } catch (err) {
      console.error('❌ DELETE_ALL_TASKS_ERROR', err)
      toast.error('Ops! Houve um erro. Tente novamente mais tarde')
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="text-sm text-rose-600 dark:text-rose-500"
        >
          Limpar
          <Trash2Icon className="text-rose-600 dark:text-rose-500 size-3 shrink-0" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja limpar sua lista de tarefas?
          </DialogTitle>
          <DialogDescription>Essa ação não pode ser desfeita</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <Button onClick={handleDeleteAllTask} variant="destructive">
            Limpar tudo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
