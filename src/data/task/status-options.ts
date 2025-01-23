import { taskFormSchema } from '@/schemas/task-form-schema'

const statusEnum = taskFormSchema.shape.status.options

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Pendente':
      return '#38BDF8'

    case 'Fazendo':
      return '#FACC15'

    case 'Concluído':
      return '#4ADE80'

    case 'Cancelado':
      return '#FB7185'

    default:
      return '#9CA3AF'
  }
}

export const statusOptions = statusEnum.map(status => ({
  color: getStatusColor(status),
  label: status,
  value: status,
}))
