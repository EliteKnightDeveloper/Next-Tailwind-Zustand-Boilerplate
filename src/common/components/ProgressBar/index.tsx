import { FC } from 'react'
import { classNames } from '@/common/utils'

interface ProgressBarProps {
  percent: number
}

const ProgressBar: FC<ProgressBarProps> = ({ percent }) => {
  return (
    <div
      className={classNames(
        'h-2 bg-[#2C2E33] rounded-full w-full z-10 relative'
      )}
    >
      <div
        className={classNames(
          'h-2 bg-gradient-to-r from-darkGradientStart to-darkGradientEnd rounded-full absolute transition-all duration-500'
        )}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
