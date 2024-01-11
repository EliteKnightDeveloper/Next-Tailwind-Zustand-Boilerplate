import { Storage } from '@/common/components/Icons'
import { useThemeStore } from '@/common/stores/themeStore'
import { classNames } from '@/common/utils'
import { IUser } from '@/interfaces'
import { FC } from 'react'

interface CreditProps {
  user: IUser
}

const Credit: FC<CreditProps> = ({ user }) => {
  const [isSidebarCollapsed] = useThemeStore((state) => [
    state.isSidebarCollapsed,
  ])

  const number = 25000

  return (
    <div className="flex flex-row items-center justify-center w-full gap-8 p-4 bg-transparent package-card">
      {!isSidebarCollapsed && (
        <div className="flex justify-left">
          <span className="text-xs font-medium text-white">Credits</span>
        </div>
      )}
      <div
        className={classNames(
          'flex items-center relative',
          isSidebarCollapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div
          className={classNames(
            'flex gap-2 items-center',
            isSidebarCollapsed ? ' flex-col items-center' : ''
          )}
        >
          <Storage />
          <span className={classNames('font-semibold gradient-text text-sm')}>
            {number.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Credit
