'use server'

export const searchTaskAction = async (_search: string) => {
  try {
    // const tasks = await searchTaskService(user.id, search)
    return []
  } catch (err) {
    console.error('❌ Erro ao listar tarefas: ', err)
  }
}
