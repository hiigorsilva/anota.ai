export const statusOptions = [
  { label: 'Pendente', color: '#9CA3AF' },
  { label: 'Fazendo', color: '#FACC15' },
  { label: 'Concluído', color: '#4ADE80' },
  { label: 'Cancelado', color: '#FB7185' },
]

export const getStatusColor = (label: string): string => {
  switch (label) {
    case 'Pendente':
      return '#9CA3AF' // Cinza
    case 'Fazendo':
      return '#FACC15' // Amarelo
    case 'Concluído':
      return '#4ADE80' // Verde
    case 'Cancelado':
      return '#FB7185' // Vermelho
    default:
      return '#ffffff' // Branco (fallback)
  }
}
