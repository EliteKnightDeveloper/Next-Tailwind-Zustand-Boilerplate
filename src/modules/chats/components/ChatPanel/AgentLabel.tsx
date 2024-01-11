import { Cross } from '@/common/components/Icons'
import Avatar from '@/common/elements/Avatar'
import { FC } from 'react'

interface AgentLabelProps {
  name: string
  image: string
  onRemove: () => void
}

const AgentLabel: FC<AgentLabelProps> = ({ name, image, onRemove }) => (
  <div className="flex items-center gap-2">
    <Avatar
      src={image}
      alt={''}
      width={32}
      height={32}
      border
      isHuman={false}
      className="w-8 h-8"
    />
    <span className="font-bold text-white">{name}</span>
    <button
      className="font-bold text-gray-300hover:text-neon-100"
      onClick={onRemove}
    >
      <Cross />
    </button>
  </div>
)

export default AgentLabel
