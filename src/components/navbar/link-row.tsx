'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

type Props = {
  link: {
    name: string
    href: string
    icon: JSX.Element
  }
}

export const LinkRow = ({ link }: Props) => {
  const pathname = usePathname()

  return (
    <Button
      variant="ghost"
      className={`justify-start gap-2 text-sm py-1 transition hover:text-foreground ${pathname === link.href ? 'text-foreground' : 'text-muted-foreground'}`}
      asChild
    >
      <Link href={link.href}>
        {link.icon}
        <span>{link.name}</span>
      </Link>
    </Button>
  )
}
