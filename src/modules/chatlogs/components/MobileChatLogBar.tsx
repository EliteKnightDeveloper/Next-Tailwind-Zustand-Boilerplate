import { FC, Fragment, useEffect, useState } from 'react'
import { Collapse, Expand, Quote, Upload } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import { useThemeStore } from '@/common/stores/themeStore'
import { classNames } from '@/common/utils'
import Loading from '@/common/components/Loading'
import { useChatStore } from '@/common/stores/chatStore'
import api from '@/api'
import Message from '@/modules/chats/components/ChatPanel/Message'
import { IMessage } from '@/interfaces'
import { exportChatLogs } from '@/common/utils/excel'

const MobileChatLogBar: FC = () => {
  const [isMobileChatLogBarCollapsed, setMobileChatLogBarCollapsed] =
    useThemeStore((state) => [
      state.isMobileChatLogBarCollapsed,
      state.setMobileChatLogBarCollapsed,
    ])
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState(false)

  const [chatroomID, chatLog] = useChatStore((state) => [
    state.chatroomID,
    state.chatLog,
  ])

  useEffect(() => {
    setMessages([])
    if (chatroomID !== 'all') {
      setLoading(true)
      api.chatLogs
        .getChatLogsByChatroomID(chatroomID)
        .then((response) => {
          const newMessages = response.chat.messages
            .slice(0, (response.chat.messages.length - 1) / 2)
            .map((message, index) => ({
              isAgent: index % 2 === 1,
              image: response.participants[0].image,
              role: response.participants[0].role,
              message: message,
            }))
          setMessages(newMessages)
          setLoading(false)
        })
        .catch((err) => {})
    }
  }, [chatroomID])

  useEffect(() => {
    setMessages([])
  }, [])

  return (
    <div
      className={classNames(
        'w-full chatlog-container px-4 py-4',
        !isMobileChatLogBarCollapsed ? 'chatlog-collapsed' : ''
      )}
    >
      <div
        className={classNames(
          'w-full  flex items-center ',
          isMobileChatLogBarCollapsed
            ? 'gap-4 justify-between'
            : 'justify-center flex-col'
        )}
      >
        <div>
          <button
            className="p-2 text-gray-300 rotate-90 bg-gray-500 rounded-xl"
            onClick={() =>
              setMobileChatLogBarCollapsed(!isMobileChatLogBarCollapsed)
            }
          >
            <Expand />
          </button>
        </div>
        {isMobileChatLogBarCollapsed && (
          <Fragment>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-3">
                <span className="text-lg font-semibold text-white">
                  Chat History
                </span>
                {/* <Quote /> */}
              </div>
            </div>
          </Fragment>
        )}
        {!isMobileChatLogBarCollapsed && (
          <div className="px-4 py-4 mt-4 rounded-xl bg-gradient-to-r from-darkGradientStart to-darkGradientEnd">
            <Upload />
          </div>
        )}
      </div>
      {isMobileChatLogBarCollapsed && messages.length > 1 && (
        <div className="flex flex-col gap-4 p-3 mt-6 overflow-y-scroll bg-gray-500 rounded-xl scrollbar-hide">
          {messages.map((message, index) => (
            <Message
              key={index}
              mode={true}
              isAgent={message.isAgent}
              message={message.message}
              role={message.role}
              image={message.image}
            />
          ))}
        </div>
      )}
      {loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default MobileChatLogBar
