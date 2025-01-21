import { ContainerApp } from '@/components/container-app'
import { Logo } from '@/components/logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-dvh w-full grid grid-cols-2">
      {/* LEFT SIDE */}
      <div>
        <ContainerApp className="bg-muted py-8">
          <div className="h-full flex flex-col justify-between">
            {/* LOGO */}
            <Logo />

            {/* DESCRIPTION */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg tracking-tight">
                Bem vindo(a)
              </h2>
              <p className="text-sm text-foreground/80 tracking-tight">
                Essa é uma ferramenta intuitiva e poderosa que irá transformar a
                maneira como você gerencia suas tarefas e projetos de um jeito
                fácil e prático.
                <strong>Ta esperando o que? Anota aí! 😉</strong>
              </p>
            </div>

            {/* FOOTER */}
            <p className="text-sm text-muted-foreground tracking-tight">
              Anota.aí 2025 &copy; Todos os direitos reservados.
            </p>
          </div>
        </ContainerApp>
      </div>

      {/* LOGIN SIDE */}
      <div>
        <ContainerApp className="flex flex-col items-center justify-center gap-6 py-8">
          {children}
        </ContainerApp>
      </div>
    </div>
  )
}
