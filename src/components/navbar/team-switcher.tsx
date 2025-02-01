import { accountGroup } from '@/data/accounts/team-switcher'
import { currentUser } from '@clerk/nextjs/server'
import { ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export const TeamSwitcher = async () => {
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-label="Selecione um time"
          className="max-w-60 w-fit justify-between"
        >
          <Avatar className="size-6 shrink-0">
            <AvatarImage
              src={
                user.imageUrl || `http://avatar.vercel.sh/${user.firstName}.png`
              }
              alt={user.firstName || 'Avatar do usuário'}
            />
            <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="flex-1 truncate">{user.fullName}</span>
          <ChevronsUpDownIcon className="text-muted-foreground size-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="start">
        <Command>
          <CommandInput placeholder="Buscar equipe..." />

          {/* LIST ITEMS */}
          <CommandList>
            <CommandEmpty>
              <span className="text-muted-foreground">
                Nenhuma equipe encontrada
              </span>
            </CommandEmpty>

            {/* GROUP ACCOUNTS */}
            {accountGroup.map(group => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map(team => (
                  <TeamAccountRow key={team.label} team={team} />
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className="cursor-pointer">
                <PlusCircleIcon className="size-4 shrink-0" />
                Criar nova equipe
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type Props = {
  team: {
    label: string
  }
}

const TeamAccountRow = ({ team }: Props) => {
  return (
    <CommandItem key={team.label} className="text-sm cursor-pointer">
      {/* AVATAR */}
      <Avatar className="size-4 shrink-0">
        <AvatarImage
          src={`http://avatar.vercel.sh/${team.label}.png`}
          alt={team.label || 'Avatar do usuário'}
        />
        <AvatarFallback>{team.label?.charAt(0)}</AvatarFallback>
      </Avatar>

      {/* NAME */}
      {team.label}
    </CommandItem>
  )
}
