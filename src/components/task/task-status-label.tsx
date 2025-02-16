import { getStatusColor } from '@/data/task/status-options'

type Props = {
  status: string
}

export const StatusLabel = ({ status }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="size-2.5 rounded-full shrink-0"
        style={{ backgroundColor: getStatusColor(status) }}
      />
      {status}
    </div>
  )
}
