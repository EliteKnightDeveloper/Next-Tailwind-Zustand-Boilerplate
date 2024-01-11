import { FC } from 'react'

interface NotificationItemProps {
  id: number
  text: string
  date: string
  status: boolean
  onRead: () => void
}

const NotificationItem: FC<NotificationItemProps> = ({
  id,
  text,
  date,
  status,
  onRead,
}) => {
  return (
    <div
      className="z-10 flex flex-row items-center justify-between gap-0 p-2 border-b hover:rounded-lg border-b-gray-500 hover:bg-gray-500"
      onClick={onRead}
    >
      <div className="flex flex-col gap-1">
        <span className="text-base font-normal text-white">{text}</span>
        <span className="text-sm font-normal text-gray-300">{date}</span>
      </div>
      {status ? (
        <div className="min-w-[8px] h-[8px] rounded-full bg-neon-200" />
      ) : (
        <div className="min-w-[8px] h-[8px] rounded-full bg-gray-500" />
      )}
    </div>
  )
}

export default NotificationItem
