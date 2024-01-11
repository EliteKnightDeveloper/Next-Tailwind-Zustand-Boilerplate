import { classNames } from '@/common/utils'
import { FC } from 'react'

interface Props {
  content: string
  percent: number
  background: string
}

const Progress: FC<Props> = ({ content, percent, background }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span className="text-sm font-normal text-white">{content}</span>
        <span className="text-xs font-semibold text-white">{percent} %</span>
      </div>
      <div
        className={classNames(
          'h-4 bg-[#2C2E33] rounded-full z-10 relative',
          percent > 0 ? 'w-full' : ''
        )}
      >
        <div
          className={classNames('h-4 rounded-full absolute')}
          style={{ width: `${percent}%`, background: `${background}` }}
        ></div>
      </div>
    </div>
  )
}

export default Progress
