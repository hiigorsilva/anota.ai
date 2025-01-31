export const getCurrentMonth = (date: Date) => {
  // PEGA O PRIMEIRO DIA DO MêS
  const startOfMonth = new Date(date)
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0) // Set time to 0h 0min 0seg 0ms

  // PEGA O ÚLTIMO DIA DO MêS
  const endOfMonth = new Date(startOfMonth)
  endOfMonth.setMonth(endOfMonth.getMonth() + 1)
  endOfMonth.setSeconds(-1)

  return { startOfMonth, endOfMonth }
}
