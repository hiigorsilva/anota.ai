import {
  CalendarIcon,
  CircleGaugeIcon,
  NotebookTextIcon,
  Settings2Icon,
} from 'lucide-react'

export const navLinks = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <CircleGaugeIcon className="size-4 shrink-0" />,
  },
  {
    name: 'Tarefas',
    href: '/tasks',
    icon: <NotebookTextIcon className="size-4 shrink-0" />,
  },
  {
    name: 'Calendário',
    href: '/calendar',
    icon: <CalendarIcon className="size-4 shrink-0" />,
  },
  {
    name: 'Gerenciar',
    href: '/settings',
    icon: <Settings2Icon className="size-4 shrink-0" />,
  },
]
