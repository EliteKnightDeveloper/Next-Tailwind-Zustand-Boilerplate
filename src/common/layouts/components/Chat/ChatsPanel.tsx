import { FC, useEffect, useState } from 'react'
import ChatItem from './ChatItem'
import { useChatStore } from '@/common/stores/chatStore'
import api from '@/api'
import { useUserStore } from '@/common/stores/userStore'
import { DEMO_CHAT } from '@/common/utils/constants'
import Skeleton from '@/common/elements/Skeleton'

const MyChatsSkeleton: FC = () =>
  Array(4)
    .fill(0)
    .map((_, index) => (
      <div className="w-full h-[15px] mt-3 px-6" key={index}>
        <Skeleton variant="rectangular" width="full" height="full" isLoading />
      </div>
    ))

const ChatsPanel: FC = () => {
  const [chats, setChats] = useChatStore((state) => [
    state.chats,
    state.setChats,
  ])

  const [userId] = useUserStore((state) => [state.user?.id])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setChats([])
    if (userId)
      api.chats.getChatsByOwner(userId!).then((response) => {
        setChats(response)
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return (
    <div className="flex flex-col justify-center px-6 py-4 bg-black rounded-xl w-[300px] form-container">
      <span className="text-sm font-bold text-gray-100">My Chats</span>
      <div
        className="h-[100px] overflow-scroll scrollbar-hide mt-4 relative z-[4]"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {isLoading ? (
          <MyChatsSkeleton />
        ) : (
          chats
            .filter((chat) => chat.name !== DEMO_CHAT)
            .map((chat) => (
              <ChatItem
                key={chat.id}
                id={chat.id}
                text={chat.name}
                messages={chat.messages.length}
                avatar={chat.participants[0].image}
              />
            ))
        )}
      </div>
    </div>
  )
}

export default ChatsPanel
