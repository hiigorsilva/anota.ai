'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { type ReactNode, useState } from 'react'
import { Button } from '../ui/button'
import { TaskForm } from './task-form'

type Props = {
  children: ReactNode
}

export const AddTaskFormModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* MODAL CONTENT */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>O que você está fazendo?</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixos para criar sua tarefa.
          </DialogDescription>
        </DialogHeader>

        <TaskForm setOpen={setOpen}>
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
        </TaskForm>
      </DialogContent>
    </Dialog>
  )
}
