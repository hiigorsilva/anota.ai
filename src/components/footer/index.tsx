import { ContainerApp } from '../container-app'
import { Logo } from '../logo'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-6">
      <ContainerApp className="flex justify-center items-center ">
        {/* LOGO */}
        <div className="scale-[.80]">
          <Logo className="text-muted-foreground transition hover:text-foreground" />
        </div>

        {/* COPYRIGHT */}
        <p className="text-sm text-muted-foreground">
          @ {currentYear} - Todos os direitos reservados.
        </p>
      </ContainerApp>
    </footer>
  )
}
