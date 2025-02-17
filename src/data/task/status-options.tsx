export const statusOptions = [
  { label: 'Pendente', color: '#ffffff' },
  { label: 'Fazendo', color: '#0ea5e9' },
  { label: 'Concluído', color: '#16a34a' },
  { label: 'Cancelado', color: '#ef4444' },
]

export const getStatusColor = (label: string): string => {
  const status = statusOptions.find(status => status.label === label)
  return status ? status.color : '#9ca3af' // Cor padrão se não encontrar o status
}
