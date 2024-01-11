import { FC, useEffect, useState } from 'react'
import ChatItem from './ChatItem'
import api from '@/api'
import Skeleton from '@/common/elements/Skeleton'
import { useChatStore } from '@/common/stores/chatStore'
import { useUserStore } from '@/common/stores/userStore'
import { DEMO_CHAT } from '@/common/utils/constants'

const MyChatsSkeleton: FC = () =>
  Array(6)
    .fill(0)
    .map((_, index) => (
      <div className="w-full h-[15px] mt-3 px-6" key={index}>
        <Skeleton variant="rectangular" width="full" height="full" isLoading />
      </div>
    ))

const MyChats: FC = () => {
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
    <>
      <div className="h-full">
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
                avatar=""
              />
            ))
        )}
      </div>
    </>
  )
}

export default MyChats
