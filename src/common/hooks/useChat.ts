import api from '@/api'
import { useChatStore } from '../stores/chatStore'

const useChat = () => {
  const [chats, setChats] = useChatStore((state) => [
    state.chats,
    state.setChats,
  ])

  const updateChat = (id: number, name: string) => {
    api.chats.renameChat(id, name).then(() => {
      setChats(
        chats.map((chat) =>
          chat.id === id
            ? {
                ...chat,
                name,
              }
            : chat
        )
      )
    })
  }

  const deleteChat = (id: number) => {
    setChats(chats.filter((chat) => chat.id !== id))
    api.chats.deleteChat(id)
  }

  return {
    updateChat,
    deleteChat,
  }
}

export default useChat
