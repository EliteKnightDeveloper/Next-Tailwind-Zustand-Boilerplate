import { FC, useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Send } from '@/common/components/Icons'
import Input from '@/common/elements/Input'
import ChatItem from '../ChatItem'
import { classNames } from '@/common/utils'
import { IAgent, IMessage } from '@/interfaces'
import api from '@/api'
import { DEMO_CHAT } from '@/common/utils/constants'
import Loading from '@/common/components/Loading'
import Thinking from '@/common/elements/Thinking'

const errorReply = 'Error reply'

interface MobileChatbarProps {
  isLoading: boolean
  agent?: IAgent
}

interface FormType {
  query: string
}

const MobileChatbar: FC<MobileChatbarProps> = ({ isLoading, agent }) => {
  const messagesContainer = useRef<HTMLDivElement>(null)
  const [chatId, setChatId] = useState<string>()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isThinking, setThinking] = useState(false)
  const [isChatCreating, setChatCreating] = useState(true)
  const { register, handleSubmit, setValue, setFocus } = useForm<FormType>()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

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
          const chat_id = response.chat.id.toString()
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

  const onSubmit = (form: FormType) => {
    const { query } = form
    if (!query || isThinking || !chatId) return

    addQuery(query)
    setValue('query', '')

    const source = api.integrations.SSE(chatId)

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

  const addQuery = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        isAgent: false,
        message,
      },
    ])
  }

  return (
    <div
      className={classNames(
        'relative w-full chat-container mobile-chat overflow-y-scroll sm:hidden'
      )}
    >
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
      <div className="relative px-4 py-4 bg-dark">
        <span className="text-xs font-normal text-gray-300">
          Estimated Credit: <span className="text-white">26</span>
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-2">
            <Input
              placeholder="Type your message here..."
              fullBorder
              {...register('query')}
              disabled={isThinking}
              className="w-full"
              position="end"
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
    </div>
  )
}

export default MobileChatbar
