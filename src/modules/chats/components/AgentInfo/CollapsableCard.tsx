import { FC, ReactNode, useState } from 'react'
import { Arrow } from '@/common/components/Icons'
import { classNames } from '@/common/utils'

interface CollapsableCardProps {
  title: string
  children: ReactNode
}

const CollapsableCard: FC<CollapsableCardProps> = ({ title, children }) => {
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed)
  }

  return (
    <div className="bg-gray-600 rounded-xl">
      <div
        className="flex justify-between p-4 cursor-pointer select-none"
        onClick={toggleCollapse}
      >
        <span className="text-base font-medium text-white">{title}</span>
        {isCollapsed && (
          <button className="text-white">
            <Arrow />
          </button>
        )}
        {!isCollapsed && (
          <button className="text-white rotate-180">
            <Arrow />
          </button>
        )}
      </div>
      <div
        className={classNames(
          'px-4 transition-all overflow-hidden duration-200',
          isCollapsed ? 'h-0' : 'h-fit pb-4'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CollapsableCard
