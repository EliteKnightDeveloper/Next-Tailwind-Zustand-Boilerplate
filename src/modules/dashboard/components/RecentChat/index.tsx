import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/api'
import { ArrowR, Quote } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import { useChatStore } from '@/common/stores/chatStore'
import { useUserStore } from '@/common/stores/userStore'
import { classNames } from '@/common/utils'
import { timeDifference } from '@/common/utils/date'
import { IChat } from '@/interfaces'
import Loading from '@/common/components/Loading'

const RecentChat: FC = () => {
  const router = useRouter()
  const [setChatroomID] = useChatStore((state) => [state.setChatroomID])
  const [userId] = useUserStore((state) => [state.user?.id])
  const [chats, setChats] = useState<IChat[]>([])
  const [isLoading, setLoading] = useState(false)

  const goToConversationPage = () => {
    router.push('/conversations/all', undefined, { shallow: true })
    setChatroomID('all')
  }

  useEffect(() => {
    setLoading(true)
    api.chats.getRecentChats(userId!).then((res: IChat[]) => {
      setLoading(false)
      setChats(res)
    })
  }, [])

  return (
    <div className="flex flex-col w-auto h-full gap-5 p-6 bg-black rounded-xl form-container max-sm:p-3">
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="flex flex-row items-center w-full gap-3">
        <span className="text-xl font-semibold text-white max-sm:text-base">
          Recent Chats
        </span>
        <Quote />
      </div>
      <div
        className={classNames(
          'z-10 flex flex-col  h-full gap-4 overflow-y-scroll scrollbar-hide'
        )}
      >
        {chats.map((chat, idx) => {
          return (
            <div
              className="flex flex-col px-2 pt-2 pb-4 border-b border-b-gray-500 hover:bg-gray-500 hover:cursor-pointer hover:rounded-xl"
              key={idx}
            >
              <div className="flex flex-col justify-between gap-1 max-sm:flex-col">
                <div className="flex flex-col max-sm:gap-2">
                  <div className="flex flex-row items-start flex-1 gap-1">
                    <span className="text-sm font-medium text-white min-w-[80px]">
                      Customer:
                    </span>
                    <span className="text-sm text-gray-700 font-noraml recent-chat">
                      {chat.messages[0]}
                    </span>
                  </div>
                  <div className="flex flex-row items-start flex-1 gap-1">
                    <span className="text-sm font-medium text-white  min-w-[80px]">
                      {chat.participants[0].name}:
                    </span>
                    <span className="text-sm text-gray-700 font-noraml recent-chat">
                      {chat.messages[1]}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-100 whitespace-pre text-right font-noraml">
                  {timeDifference(chat.end_time)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-end w-full">
        <Button
          text="See All"
          variant="gradient"
          className="z-10"
          icon={<ArrowR />}
          onClick={goToConversationPage}
        />
      </div>
    </div>
  )
}

export default RecentChat
