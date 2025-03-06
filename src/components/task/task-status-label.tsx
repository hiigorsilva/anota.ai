import { getStatusColor } from '@/data/task/status-options'

type Props = {
  status: string
  size?: 'sm' | 'default'
}

export const StatusLabel = ({ status, size = 'default' }: Props) => {
  const labelSize = size === 'sm' ? 'size-1.5' : 'size-2.5'
  const fontSize = size === 'sm' ? 'text-sm' : 'text-base'

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${labelSize} rounded-full shrink-0`}
        style={{ backgroundColor: getStatusColor(status) }}
      />
      <span className={fontSize}>{status}</span>
    </div>
  )
}
