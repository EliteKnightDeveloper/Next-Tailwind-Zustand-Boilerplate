import Avatar from '@/common/elements/Avatar'
import { FC } from 'react'

interface MemberCardProps {
  avatar: string
  name: string
  email: string
  role: string
}

const MemberCard: FC<MemberCardProps> = ({ avatar, name, email, role }) => (
  <div className="flex flex-row items-center justify-between w-full pb-4 border-b border-b-gray-700">
    <div className="flex flex-row gap-3">
      <Avatar
        src={avatar}
        width={45}
        height={45}
        alt={''}
        border
        isHuman={true}
      />
      <div className="flex flex-col">
        <span className="font-medium text-white font-sm">{name}</span>
        <span className="font-normal text-gray-400 font-sm">{email}</span>
      </div>
    </div>
    <span className="font-normal text-white font-sm">{role}</span>
  </div>
)

export default MemberCard
