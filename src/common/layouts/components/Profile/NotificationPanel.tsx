import { FC, useRef } from 'react'
import { SidebarTrash } from '@/common/components/Icons'
import NotificationItem from './NotificationItem'
import { usePopup } from '@/common/hooks/usePopup'
import { useThemeStore } from '@/common/stores/themeStore'
import { INotification } from '@/interfaces'

interface NotificationPanelProps {
  data: INotification[]
  onRead: (id: string) => void
  onReadAll: () => void
}

const NotificationPanel: FC<NotificationPanelProps> = ({
  data,
  onRead,
  onReadAll,
}) => {
  const { showConfirm, hideConfirm } = usePopup()
  const containerRef = useRef<HTMLDivElement>(null)

  const [setNotificationPanelOpened] = useThemeStore((state) => [
    state.setNotificationPanelOpened,
  ])

  const confirmDelete = () => {
    showConfirm({
      title: 'Delete all notifications?',
      confirmText: 'Delete',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setNotificationPanelOpened(false)
        hideConfirm()
      },
    })
  }

  return (
    <div
      className="px-6 py-4 bg-black rounded-xl form-container w-[300px] shadow-[0px_4px_32px_0px_rgba(0px_0px_0px_0.25px)] ml-[5px]"
      ref={containerRef}
    >
      <div className="flex flex-row items-center justify-between">
        <span className="text-lg font-semibold text-gray-100">
          Notifications {data.length > 0 ? `(${data.length})` : ''}
        </span>
        <div onClick={confirmDelete} className="z-10">
          <SidebarTrash />
        </div>
      </div>
      {data.length > 0 && (
        <>
          <div className="flex flex-col gap-2 mt-4 overflow-scroll scrollbar-hide">
            {data.length < 1 && (
              <div className="flex justify-center">
                <span className="z-[10] text-base font-semibold text-neon-200">
                  No Notifications
                </span>
              </div>
            )}
            {data.map((notification, index) => (
              <NotificationItem
                key={index}
                id={notification.id}
                text={notification.text}
                date={notification.date}
                status={notification.status}
                onRead={() => onRead(notification.id)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4" onClick={onReadAll}>
            <span className="z-[10] text-base font-semibold text-neon-200">
              Mark as read
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationPanel
