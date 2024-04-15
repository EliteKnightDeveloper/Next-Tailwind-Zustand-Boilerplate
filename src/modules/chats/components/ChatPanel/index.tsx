import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import api from '@/api'
import Avatar from '@/common/elements/Avatar'
import { SquarePlus, Refresh, Send } from '@/common/components/Icons'
import ChatInput from '@/common/elements/ChatInput'
import Message from './Message'
import AddAgents from './AddAgents'
import Skeleton from '@/common/elements/Skeleton'
import { useForm } from 'react-hook-form'
import { IAgent, IMessage } from '@/interfaces'
import Loading from '@/common/components/Loading'
import Tooltip from '@/common/elements/Tooltip'
import { ImageUrl } from '@/common/utils/constants'
import useChat from '@/common/hooks/useChat'
import Thinking from '@/common/elements/Thinking'
import { useUserStore } from '@/common/stores/userStore'

const errorReply = 'Error reply'

interface FormType {
  query: string
}

interface ChatPanelProps {
  agent: IAgent
  isLoading: boolean
  defaultMessages: string[]
}

var source: EventSource
var changed = false

const ChatPanel: FC<ChatPanelProps> = ({
  agent,
  isLoading,
  defaultMessages,
}) => {
  const { query: queryParam } = useRouter()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isAddAgentsOpen, setAddAgentsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const messagesContainer = useRef<HTMLDivElement>(null)
  const { register, handleSubmit, setValue, setFocus } = useForm<FormType>()
  const { summarizeChat, deleteChat } = useChat()
  const tenant = useUserStore((state) => state.tenant)
  const [isThinking, setThinking] = useState(false)

  const initialGreeting: IMessage = {
    isAgent: true,
    message:
      agent.welcome ||
      `Hello and welcome! My name is ${agent.name}, and I'm here to assist you. If you have any questions or concerns, please share them with me. How can I help you today?`,
    image: agent.image,
    role: agent.role,
    response: 'Success',
    mode: false,
  }

  useEffect(() => {
    if (!messagesContainer.current) return
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
  }, [messages, isThinking])

  useEffect(() => {
    setFocus('query')
  }, [queryParam.id, isThinking])

  useEffect(() => {
    if (isThinking) changed = true
    setMessages([])
    setThinking(false)
    source?.close()
    clearTimeout(timeoutRef.current)
  }, [queryParam.id])

  useEffect(() => {
    return () => {
      if (localStorage.getItem('is-first-query') === 'true') {
        localStorage.setItem('is-first-query', 'false')
        deleteChat(queryParam.id?.toString() || '')
      }
    }
  }, [queryParam.id])

  useEffect(() => {
    if (Array.isArray(defaultMessages) && defaultMessages.length >= 1) {
      setMessages([
        initialGreeting,
        ...defaultMessages.map((message, index) => ({
          isAgent: index % 2 === 1,
          message: message,
          image: agent.image,
          role: agent.role,
          response: message,
          mode: false,
        })),
      ])
    } else {
      setMessages([initialGreeting])
    }
  }, [defaultMessages])

  const addQuery = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        isAgent: false,
        message,
        mode: false,
      },
    ])
  }

  const toggleAddAgentsOpen = () => {
    setAddAgentsOpen(!isAddAgentsOpen)
  }

  const addMessage = (reply: string, response: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        isAgent: true,
        message: reply,
        image: agent.image,
        name: agent.name,
        role: agent.role,
        response,
        mode: false,
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

  const summarize = () => {
    if (localStorage.getItem('is-first-query') === 'true') {
      localStorage.setItem('is-first-query', 'false')
      summarizeChat(queryParam.id?.toString() || '')
    }
    localStorage.setItem('is-first-query', 'false')
  }

  const onSubmit = (form: FormType) => {
    const { query } = form
    if (!query || isThinking || !queryParam.id) return

    addQuery(query)
    setValue('query', '')

    source = api.integrations.SSE(tenant, queryParam.id as string)

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
          addMessage(thought || finalAnswer, JSON.stringify(event.data))
          setThinking(false)
          return false
        } else {
          if (thought) {
            updateLastMessage(thought, true)
          }
          if (finalAnswer) {
            updateLastMessage(finalAnswer)

            summarize()
            source.close()
            return false
          }
        }
        return isThinking
      })
      timeoutRef.current = setTimeout(() => {
        summarize()
        clearStreaming()
      }, 10000)
    }

    setThinking(true)
    api.integrations
      .webUI(queryParam.id as string, query)
      .then((resp) => {
        if (changed) {
          setThinking(false)
          changed = false
          return
        }

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
    <div className="relative agent-chat h-[calc(100vh-3.3rem)] max-sm:h-full">
      <div className="w-full px-6 py-2.5 flex gap-4 bg-dark items-center">
        {!isLoading ? (
          <Avatar
            src={ImageUrl + '/' + agent.image}
            alt={''}
            width={52}
            height={52}
            border
            isHuman={false}
            className="w-[52px] h-[52px]"
          />
        ) : (
          <div className="w-[52px] h-[52px]">
            <Skeleton width="fit" height="fit" variant="avatar" isLoading />
          </div>
        )}
        <div className="flex flex-col flex-1">
          {isLoading ? (
            <div className="w-[250px] h-[12px]">
              <Skeleton
                width="full"
                height="full"
                isLoading
                variant="rectangular"
              />
            </div>
          ) : (
            <span className="text-base font-bold text-white">{agent.name}</span>
          )}
          {isLoading ? (
            <div className="w-[150px] mt-2">
              <Skeleton width="fit" height="fit" />
            </div>
          ) : (
            <span className="text-gray-300 document-title">{agent.role}</span>
          )}
        </div>
        {/* DEMO
        <Tooltip description={'Add Agent'}>
          <button onClick={toggleAddAgentsOpen}>
            <SquarePlus />
          </button>
        </Tooltip> */}
      </div>
      <div
        className="flex flex-col flex-1 gap-3 px-6 py-4 overflow-y-auto scrollbar-hide"
        ref={messagesContainer}
      >
        {!isLoading &&
          messages.map((message, index) => (
            <Message
              {...message}
              key={index}
              testNode={index === messages.length - 1 ? true : false}
            />
          ))}
        {isThinking && <Thinking image={agent.image} />}
      </div>

      <div className="z-10 px-6 py-4 bg-dark">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4">
          <ChatInput
            placeholder="Type your message here..."
            fullBorder
            {...register('query')}
            disabled={isThinking}
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
          <Tooltip description={'Start a new chat sesion'}>
            <button
              className="items-end text-gray-300 hover:text-neon-100"
              type="button"
              onClick={() => {
                setMessages([])
              }}
            >
              <Refresh />
            </button>
          </Tooltip>
        </form>
        <div className="mt-2">
          <span className="text-xs font-normal text-gray-300">
            Estimated Azara Credit: <span className="text-white">150</span>
          </span>
        </div>
      </div>
      <AddAgents
        isOpen={isAddAgentsOpen}
        onClose={toggleAddAgentsOpen}
        onAddAgents={toggleAddAgentsOpen}
      />

      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default ChatPanel
