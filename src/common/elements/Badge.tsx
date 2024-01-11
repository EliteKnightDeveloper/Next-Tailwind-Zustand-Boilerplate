import { FC } from 'react'

interface BadgeProps {
  value: string | number
}

const Badge: FC<BadgeProps> = ({ value }) => (
  <div className="px-2 py-1 text-sm font-medium text-white bg-white rounded-full bg-opacity-10 w-fit">
    {value}
  </div>
)

export default Badge
