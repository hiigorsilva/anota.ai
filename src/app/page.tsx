import { Navbar } from '@/components/navbar'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Home = async () => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/sign-in')
  }

  return (
    <div className="flex flex-col min-h-dvh w-full">
      <Navbar />
    </div>
  )
}

export default Home
