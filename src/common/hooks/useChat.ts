import api from '@/api'
import { useChatStore } from '../stores/chatStore'

const useChat = () => {
  const [chats, setChats] = useChatStore((state) => [
    state.chats,
    state.setChats,
  ])

  const updateChat = (id: string, name: string) => {
    api.chats.renameChat(id, name).then((res) => {
      setChats(
        chats.map((chat) =>
          chat.id === id
            ? {
                ...chat,
                name: res.chat.name,
              }
            : chat
        )
      )
    })
  }

  const summarizeChat = (id: string) => {
    api.chats.summarizeChat(id).then((res) => {
      setChats(
        chats.map((chat) =>
          chat.id === id
            ? {
                ...chat,
                name: res.chat.name,
              }
            : chat
        )
      )
    })
  }

  const deleteChat = (id: string) => {
    setChats(chats.filter((chat) => chat.id !== id))
    api.chats.deleteChat(id)
  }

  return {
    updateChat,
    deleteChat,
    summarizeChat,
  }
}

export default useChat
