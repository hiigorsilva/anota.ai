'use client'

import { removeTaskAction } from '@/actions/task/remove-task'
import type { TaskType } from '@/schemas/list-task'
import { Trash2Icon } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
  task: TaskType
}

export const DeleteTaskButton = ({ task }: Props) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => removeTaskAction(task.id)}
    >
      <Trash2Icon className="text-rose-600 dark:text-rose-500 size-4 shrink-0" />
    </Button>
  )
}
