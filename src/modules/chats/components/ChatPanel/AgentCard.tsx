import { FC, Fragment } from 'react'
import Avatar from '@/common/elements/Avatar'

export type AgentCardProps = {
  id: string
  title: string
  name: string
  description: string
  image: string
  archived?: boolean
  checked: boolean
}

const AgentCard: FC<AgentCardProps> = ({
  title,
  name,
  description,
  image,
  archived = false,
  checked,
}) => {
  return (
    <Fragment>
      <div
        className={`flex flex-col cursor-pointer justify-center items-center ${
          archived ? 'opacity-30' : ''
        }`}
      >
        <Avatar
          src={image}
          width={120}
          height={120}
          alt={''}
          border
          badgeIcon={'none'}
        />
        <div className="flex flex-col justify-end items-center bg-black rounded-xl px-5 pt-2 pb-5 -mt-[calc(15%)] z-0 w-full avatar-card ">
          <div className="flex justify-end w-full">
            <input
              type="checkbox"
              checked={checked}
              className="w-4 h-4 -mr-2 accent-purple-100"
            />
          </div>
          <div className="flex flex-col justify-center items-center pb-2 border-b border-gray-500 mt-8 w-full max-sm:mt-12">
            <span className="text-lg text-white text-medium document-title">
              {name}
            </span>
            <span className="mt-2 text-base text-gray-300 text-medium">
              {title}
            </span>
          </div>
          <span className="flex mt-2 text-sm font-normal text-center text-gray-300">
            {description}
          </span>
        </div>
      </div>
    </Fragment>
  )
}

export default AgentCard
