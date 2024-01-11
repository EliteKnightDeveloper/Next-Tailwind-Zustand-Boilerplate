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
import { exportExcel } from '@/common/utils/excel'

const ChatLogbar: FC = () => {
  const [isChatLogBarCollapsed, setChatLogBarCollapsed] = useThemeStore(
    (state) => [state.isChatLogBarCollapsed, state.setChatLogBarCollapsed]
  )
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState(false)

  const [chatroomID, chatLog] = useChatStore((state) => [
    state.chatroomID,
    state.chatLog,
  ])

  useEffect(() => {
    setMessages([])
    if (chatroomID !== 0) {
      setLoading(true)
      api.chatLogs
        .getChatLogsByChatroomID(chatroomID!)
        .then((response) => {
          const newMessages = response.chat.messages.map((message, index) => ({
            isAgent: index % 2 === 1,
            image: response.participants[0].image,
            role: response.participants[0].role,
            message: message,
          }))
          setMessages(newMessages)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
        })
    }
  }, [chatroomID])

  useEffect(() => {
    setMessages([])
    setChatLogBarCollapsed(false)
  }, [])

  const exportToExcel = () => {
    const data = chatLog

    const headers = [
      'Customer',
      'Channel',
      'Message',
      'Datetime',
      'Agent',
      'Credits Used',
      'Interaction Time',
      'Date Exported',
    ]
    exportExcel(data, headers, 'ChatLog History')
  }

  return (
    <div
      className={classNames(
        'w-full chatlog-container px-4 py-4',
        !isChatLogBarCollapsed ? 'chatlog-collapsed' : ''
      )}
    >
      <div
        className={classNames(
          'w-full  flex items-center ',
          isChatLogBarCollapsed
            ? 'gap-4 justify-between'
            : 'justify-center flex-col'
        )}
      >
        <Button
          icon={
            isChatLogBarCollapsed ? (
              <div className="text-white hover:text-neon-100">
                {' '}
                <Expand />
              </div>
            ) : (
              <div className="text-white hover:text-neon-100">
                {' '}
                <Collapse />
              </div>
            )
          }
          text=""
          variant="solid"
          onClick={() => {
            setChatLogBarCollapsed(!isChatLogBarCollapsed)
          }}
        />
        {isChatLogBarCollapsed && (
          <Fragment>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-3">
                <span className="text-xl font-semibold text-white">
                  Chat History
                </span>
                {/* <Quote /> */}
              </div>
              <Button
                text="Export"
                variant="gradient"
                icon={<Upload />}
                onClick={exportToExcel}
              />
            </div>
          </Fragment>
        )}
        {!isChatLogBarCollapsed && (
          <div className="px-4 py-4 mt-4 rounded-xl bg-gradient-to-r from-darkGradientStart to-darkGradientEnd">
            <Upload />
          </div>
        )}
      </div>
      {isChatLogBarCollapsed && messages.length > 1 && (
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
      {isChatLogBarCollapsed && messages.length == 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-3 mt-6">
          <span className="text-lg font-normal text-white">No Messages </span>
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

export default ChatLogbar
