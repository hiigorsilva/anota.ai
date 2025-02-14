import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()
  if (!user) {
    redirect('/sign-in')
  }

  return <div className="flex flex-col flex-1 w-full">{children}</div>
}
