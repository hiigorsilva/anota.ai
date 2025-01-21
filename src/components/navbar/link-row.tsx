'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  link: {
    name: string
    href: string
  }
}

export const LinkRow = ({ link }: Props) => {
  const pathname = usePathname()

  return (
    <Link
      key={link.name}
      href={link.href}
      className={`text-sm transition hover:text-foreground ${pathname === link.href ? 'text-foreground' : 'text-muted-foreground'}`}
    >
      {link.name}
    </Link>
  )
}
