import { revalidatePath } from 'next/cache'

export const revalidateTasks = () => {
  revalidatePath('/')
  revalidatePath('/tasks')
}
