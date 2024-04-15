import { FC, useEffect, useState, Fragment } from 'react'
import Avatar from '@/common/elements/Avatar'
import { Logout, Ring } from '@/common/components/Icons'
import { useThemeStore } from '@/common/stores/themeStore'
import { classNames } from '@/common/utils'
import { attemptSignOut } from '@/api/firebase'
import { useRouter } from 'next/router'
import { useUserStore } from '@/common/stores/userStore'
import { useGlobalStore } from '@/common/stores/globalStore'
import { ImageUrl } from '@/common/utils/constants'
import NotificationPanel from './NotificationPanel'
import { INotification } from '@/interfaces'

const data: INotification[] = [
  {
    id: '',
    text: 'New web widget chat - John Smith',
    date: '20/10/23 - 12:35',
    status: true,
  },
  {
    id: '',
    text: 'New web widget chat - Mike',
    date: '20/10/23 - 12:35',
    status: false,
  },
  {
    id: '',
    text: 'New web widget chat - John Smith',
    date: '20/10/23 - 12:35',
    status: true,
  },
]

const Profile: FC = () => {
  const [
    isSidebarCollapsed,
    isNotificationPanelOpened,
    setNotificationPanelOpened,
  ] = useThemeStore((state) => [
    state.isSidebarCollapsed,
    state.isNotificationPanelOpened,
    state.setNotificationPanelOpened,
  ])

  const [notifications, setNotifications] = useState<INotification[]>(data)
  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser])
  const [setIsSignedIn] = useGlobalStore((state) => [state.setIsSignedIn])

  useEffect(() => {
    setIsClient(true)
  }, [user])

  const router = useRouter()

  const logOut = () => {
    attemptSignOut({
      onSuccess: () => {
        setUser(null)
        setIsSignedIn(false)
        router.push('/')
      },
      onFail: (error: any) => {},
    })
  }

  useEffect(() => {
    setNotifications(data)
  }, [])

  return (
    <Fragment>
      {isClient && (
        <div
          className={classNames(
            'flex sm:gap-4 items-center',
            isSidebarCollapsed ? 'flex-col' : ''
          )}
        >
          <Avatar
            src={user ? user.image : ImageUrl!}
            alt={''}
            width={36}
            height={36}
            badgeIcon={'status'}
          />
          {!isSidebarCollapsed && (
            <div className="flex-1">
              <span className="text-sm font-medium text-neon-200 max-sm:hidden">
                {user?.name}
              </span>
            </div>
          )}
          <div
            className={classNames(
              'flex hover:cursor-pointer max-sm:hidden bg-gray-600 p-2 rounded-lg z-[100]',
              isSidebarCollapsed ? 'relative' : ''
            )}
          >
            <div
              className="relative z-10 inline-block text-gray-300 select-none h-fit notification-ring hover:text-neon-100"
              onClick={() =>
                setNotificationPanelOpened(!isNotificationPanelOpened)
              }
            >
              <Ring />
              {notifications.filter((n) => n.status).length > 0 && (
                <span className="absolute top-0 right-0 block h-[6px] w-[6px] rounded-full bg-neon-200"></span>
              )}
            </div>
            <div
              className={classNames(
                'absolute top-0',
                isNotificationPanelOpened ? 'opacity-100' : 'opacity-0 hidden',
                isSidebarCollapsed ? 'left-[calc(175%)]' : 'left-full'
              )}
            >
              <NotificationPanel
                data={notifications}
                onRead={(id) => {
                  setNotifications(
                    notifications.map((n) =>
                      n.id !== id
                        ? n
                        : {
                            ...n,
                            status: false,
                          }
                    )
                  )
                }}
                onReadAll={() => {
                  setNotifications(
                    notifications.map((n) => ({
                      ...n,
                      status: false,
                    }))
                  )
                }}
              />
            </div>
          </div>
          <div
            className="z-10 flex p-2 text-gray-300 bg-gray-600 rounded-lg hover:cursor-pointer max-sm:hidden hover:text-neon-100"
            onClick={logOut}
          >
            <Logout />
          </div>
        </div>
      )}
      <div
        className={classNames(
          'border-t border-gray-500 max-sm:border-none',
          isSidebarCollapsed ? 'sm:mt-4' : 'sm:mt-4'
        )}
      />
    </Fragment>
  )
}

export default Profile
