import { cn } from '@/lib/utils'
import { ShellIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  className?: string
}

export const Logo = ({ className }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        'w-fit flex items-center gap-0.5 shrink-0 font-bold text-xl text-foreground/85 tracking-tighter hover:text-foreground/100',
        className
      )}
    >
      <ShellIcon className="text-foreground size-5" />
      anota.aí
    </Link>
  )
}
