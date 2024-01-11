import { FC } from 'react'
import { classNames } from '@/common/utils'

interface ProgressBarProps {
  percent: number
}

const ProgressBar: FC<ProgressBarProps> = ({ percent }) => {
  return (
    <div
      className={classNames(
        'h-2 bg-[#2C2E33] rounded-full z-10 relative',
        percent > 0 ? 'w-full' : ''
      )}
    >
      <div
        className={classNames('h-2 bg-neon-100 rounded-full absolute')}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
