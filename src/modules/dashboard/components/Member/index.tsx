import { FC } from 'react'
import { Quote } from '@/common/components/Icons'
import MemberCard from './MemberCard'
import { useUserStore } from '@/common/stores/userStore'
import { HUMAN_AVATARS } from '@/common/utils/constants'

const Members: FC = () => {
  const [user] = useUserStore((state) => [state.user])

  const members = [
    {
      avatar: HUMAN_AVATARS[3],
      name: 'Tran Huyen',
      email: 'tran@gmail.com',
      role: 'Full Access',
    },
    {
      avatar: HUMAN_AVATARS[2],
      name: 'Steve King',
      email: 'steve@gmail.com',
      role: 'Can View',
    },
  ]

  return (
    <div className="flex flex-col w-auto p-6 bg-black rounded-xl form-container h-fit max-sm:p-3">
      <div className="flex flex-row items-center w-full gap-3">
        <span className="text-xl font-semibold text-white max-sm:text-base">
          Manage Members
        </span>
        <Quote />
      </div>
      <span className="mt-2 text-sm font-normal text-gray-400">
        Only people invited in this list can access this account
      </span>
      <div className="flex flex-col gap-4 mt-3">
        {members.map((member, index) => {
          return (
            <MemberCard
              avatar={member.avatar}
              name={member.name}
              email={member.email}
              role={member.role}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Members
