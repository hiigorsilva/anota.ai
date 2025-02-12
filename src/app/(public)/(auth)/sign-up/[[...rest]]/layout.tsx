import { ContainerApp } from '@/components/container-app'
import { Logo } from '@/components/logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar conta',
}

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <ContainerApp className="flex flex-1 flex-col items-center justify-center gap-6 py-8">
        <Logo />
        {children}
      </ContainerApp>
    </div>
  )
}
