export const statusOptions = [
  { label: 'Pendente', color: '#9CA3AF' },
  { label: 'Fazendo', color: '#FACC15' },
  { label: 'Concluído', color: '#4ADE80' },
  { label: 'Cancelado', color: '#FB7185' },
]

export const getStatusColor = (label: string): string => {
  const status = statusOptions.find(status => status.label === label)
  return status ? status.color : '#ffffff' // Cor padrão se não encontrar o status
}
