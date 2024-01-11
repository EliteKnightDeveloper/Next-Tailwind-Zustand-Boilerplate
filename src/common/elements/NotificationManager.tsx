import { FC, ReactNode, Fragment, useEffect } from 'react'
import { classNames } from '@/common/utils'
import {
  NotificationSuccess,
  NotificationFail,
} from '@/common/components/Icons'
import { useNotificationsStore } from '@/state/notificationStore'
import { useNotifications } from '@/hooks/useNotifications'

export interface Notification {
  id: string
  type: 'Success' | 'Fail'
  text: string
}

export interface NotificationManager {
  children: ReactNode
}

const Notification: FC<Notification> = ({ id, type, text }) => {
  const { deleteNotification } = useNotifications()
  useEffect(() => {
    const timeout = setTimeout(() => {
      deleteNotification(id)
    }, 1000)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <div
        className={classNames(
          'relative transform rounded-xl text-left transition-all p-3 animate-fade-up z-[10000] bg-[#17181A] text-white max-sm:w-full'
        )}
      >
        <div
          className="flex flex-row justify-between gap-3"
          onClick={() => {
            deleteNotification(id)
          }}
        >
          {type === 'Success' ? <NotificationSuccess /> : <NotificationFail />}
          <span className="w-max">{text}</span>
        </div>
      </div>
    </Fragment>
  )
}

const NotificationManager: FC<NotificationManager> = ({ children }) => {
  const [notifications] = useNotificationsStore((state) => [
    state.notifications,
  ])

  return (
    <Fragment>
      {children}
      <div className="fixed z-[10000] xl:top-0 left-[50%] -translate-x-[50%] p-4 max-sm:translate-y-[30%]">
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
      <div id="headlessui-portal-root"></div>
    </Fragment>
  )
}

export default NotificationManager
