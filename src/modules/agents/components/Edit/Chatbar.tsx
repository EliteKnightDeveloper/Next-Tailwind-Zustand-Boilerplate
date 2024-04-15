import { FC, Fragment, useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  Collapse,
  Expand,
  Message,
  Send,
  Spinner,
  Window,
} from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import ChatInput from '@/common/elements/ChatInput'
import { useThemeStore } from '@/common/stores/themeStore'
import ChatItem from '../ChatItem'
import { classNames } from '@/common/utils'
import { IAgent, IMessage } from '@/interfaces'
import api from '@/api'
import { DEMO_CHAT, appLinks } from '@/common/utils/constants'
import Skeleton from '@/common/elements/Skeleton'
import Loading from '@/common/components/Loading'
import { useChatStore } from '@/common/stores/chatStore'
import { useRouter } from 'next/router'
import Thinking from '@/common/elements/Thinking'
import Writing from '@/common/elements/Writing'
import { useUserStore } from '@/common/stores/userStore'

interface ChatbarProps {
  isLoading: boolean
  agent?: IAgent
}

interface FormType {
  query: string
}

const errorReply = 'Error reply'

const Chatbar: FC<ChatbarProps> = ({ isLoading, agent }) => {
  const messagesContainer = useRef<HTMLDivElement>(null)
  const [chatId, setChatId] = useState<string>()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isThinking, setThinking] = useState(false)
  const [isChatCreating, setChatCreating] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const { register, handleSubmit, setValue, setFocus } = useForm<FormType>()
  const [chats, setChats] = useChatStore((state) => [
    state.chats,
    state.setChats,
  ])
  const router = useRouter()
  const [isFullScreening, setFullScreening] = useState(false)
  const tenant = useUserStore((state) => state.tenant)

  const [isChatbarOpened, setChatbarOpened] = useThemeStore((state) => [
    state.isChatbarOpened,
    state.setChatbarOpened,
  ])

  useEffect(() => {
    setFocus('query')
  }, [isThinking, messages])

  const addMessage = (reply: string, response: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        isAgent: true,
        message: reply,
        image: agent?.image,
        name: agent?.name,
        role: agent?.role,
        response,
      },
    ])
  }

  const updateLastMessage = (reply: string, isStreaming?: boolean) => {
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      {
        ...prevMessages.slice(-1)[0],
        message: reply,
        isStreaming,
      },
    ])
  }

  const clearStreaming = () => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        const { isStreaming, ...newMessage } = message
        return newMessage
      })
    )
  }

  useEffect(() => {
    setChatCreating(true)
    if (agent) {
      api.chats
        .createChat({
          name: DEMO_CHAT,
          agent_id: agent.id,
        })
        .then((response) => {
          const chat_id = response.id.toString()
          setChatId(chat_id)
          setChatCreating(false)

          setMessages([
            {
              isAgent: true,
              message:
                agent?.welcome ||
                `Hello and welcome! My name is ${agent.name}, and I'm here to assist you. If you have any questions or concerns, please share them with me. How can I help you today?`,
              image: agent.image,
              role: agent.role,
              response: 'Success',
            },
          ])
        })
    }
  }, [agent])

  useEffect(() => {
    if (!messagesContainer.current) return
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
  }, [messages])

  const addQuery = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        isAgent: false,
        message,
      },
    ])
  }

  const onSubmit = (form: FormType) => {
    const { query } = form
    if (!query || isThinking || !chatId) return

    addQuery(query)
    setValue('query', '')

    const source = api.integrations.SSE(tenant, chatId)

    source.onmessage = function (event) {
      let message
      try {
        message = JSON.parse(event.data)
      } catch (e) {
        message = { final_answer: event.data }
      }

      const { thought, final_answer: finalAnswer } = message
      clearTimeout(timeoutRef.current)
      setThinking((isThinking) => {
        if (isThinking) {
          // First streaming word
          addMessage(thought || finalAnswer, JSON.stringify(event.data))
          return false
        } else {
          if (thought) {
            updateLastMessage(thought, true)
          }
          if (finalAnswer) {
            updateLastMessage(finalAnswer)
            source.close()
            return false
          }
        }
        return isThinking
      })
      timeoutRef.current = setTimeout(() => {
        clearStreaming()
      }, 10000)
    }

    setThinking(true)
    api.integrations
      .webUI(chatId as string, query)
      .then((resp) => {
        if ((resp as any).error) {
          addMessage(errorReply, JSON.stringify(resp))
        } else {
          setThinking(true)
        }
      })
      .catch((err) => {
        addMessage(errorReply, err.response?.data?.detail)
        setThinking(false)
        source.close()
      })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      return handleSubmit(onSubmit)()
    }
  }

  return (
    <div
      className={classNames(
        'w-full chat-container',
        !isChatbarOpened ? 'chat-collapsed' : ''
      )}
    >
      <div
        className={classNames(
          'w-full px-4 py-4 flex items-center ',
          isChatbarOpened ? 'bg-dark gap-4' : 'justify-center flex-col'
        )}
      >
        <Button
          icon={
            isChatbarOpened ? (
              <div className="text-white hover:text-neon-100">
                <Expand />
              </div>
            ) : (
              <div className="text-white hover:text-neon-100">
                <Collapse />
              </div>
            )
          }
          text=""
          variant="solid"
          onClick={() => {
            setChatbarOpened(!isChatbarOpened)
          }}
        />
        {isChatbarOpened && (
          <Fragment>
            <div className="flex flex-col flex-1">
              {isLoading || isChatCreating ? (
                <div className="w-[150px] h-[12px]">
                  <Skeleton
                    width="full"
                    height="full"
                    isLoading
                    variant="rectangular"
                  />
                </div>
              ) : (
                <span className="text-sm font-semibold text-white">
                  {agent?.name}
                </span>
              )}
              {isLoading || isChatCreating ? (
                <div className="w-[100px] mt-2">
                  <Skeleton width="fit" height="fit" />
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-300">
                  {agent?.role}
                </span>
              )}
            </div>
            <Button
              text="Full Screen"
              variant="solid"
              icon={isFullScreening ? <Spinner /> : <Window />}
              disabled={isFullScreening}
              className="text-sm"
              onClick={() => {
                setFullScreening(true)
                api.chats
                  .createChat({
                    name: 'Untitled',
                    agent_id: agent?.id!,
                  })
                  .then((data) => {
                    setFullScreening(false)
                    setChats([...chats, data])
                    router.push(`${appLinks.chat}/${data.id}`, undefined, {
                      shallow: true,
                    })
                  })
              }}
            />
          </Fragment>
        )}
        {!isChatbarOpened && (
          <div className="px-4 py-4 mt-4 text-white rounded-xl bg-gradient-to-r from-darkGradientStart to-darkGradientEnd">
            <Message />
          </div>
        )}
      </div>
      {isChatbarOpened && (
        <div
          className="relative flex flex-col flex-1 gap-4 p-6 overflow-y-scroll scrollbar-hide"
          ref={messagesContainer}
        >
          {messages.map((message, index) => (
            <ChatItem {...message} key={index} />
          ))}
          {isThinking && <Thinking image={agent?.image!} />}

          {(isLoading || isChatCreating) && (
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <Loading />
            </div>
          )}
        </div>
      )}
      {isChatbarOpened && (
        <div className="relative px-4 py-4 bg-dark">
          <span className="text-xs font-normal text-gray-300">
            Estimated Azara Credit: <span className="text-white">26</span>
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-2">
              <ChatInput
                placeholder="Type your message here..."
                fullBorder
                {...register('query')}
                disabled={isChatCreating || isLoading || isThinking}
                className="w-full"
                position="end"
                onKeyDown={handleKeyDown}
                icon={
                  <button
                    className="z-10 text-gray-700 cursor-pointer hover:text-neon-100"
                    type="submit"
                  >
                    <Send />
                  </button>
                }
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chatbar
