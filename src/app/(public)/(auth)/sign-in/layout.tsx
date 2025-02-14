import { ContainerApp } from '@/components/container-app'
import { Logo } from '@/components/logo'
import { getUser } from '@/lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default async function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()
  if (user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col flex-1 w-full">
      <ContainerApp className="flex flex-1 flex-col items-center justify-center gap-6 py-8">
        <Logo />
        {children}
      </ContainerApp>
    </div>
  )
}
