import { SelectItem } from '../ui/select'

type Props = {
  option: {
    label: string
    color: string
  }
}

export const StatusSelectItem = ({ option }: Props) => {
  return (
    <SelectItem value={option.label}>
      <div className="flex items-center gap-2">
        <div
          className="size-2.5 rounded-full"
          style={{ backgroundColor: option.color }}
        />
        {option.label}
      </div>
    </SelectItem>
  )
}
