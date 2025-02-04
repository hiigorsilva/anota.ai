import { intlFormatDistance } from 'date-fns'
// import { ptBR } from 'date-fns/locale/pt-BR'

export const formatTime = (date: Date): string => {
  const currentDate = new Date()
  return intlFormatDistance(date, currentDate, { locale: 'pt-BR' })
}
