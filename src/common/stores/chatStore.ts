import { create } from 'zustand'
import { IChat, IContact } from '@/interfaces'
import { persist } from 'zustand/middleware'

interface ChatStoreInterface {
  chats: IChat[]
  setChats: (chats: IChat[]) => void
  chatroomID: number | null
  setChatroomID: (chatroomID: number | null) => void
  chatLog: IChat
  setChatLog: (chatLog: IChat) => void
  contact: IContact
  setContact: (contact: IContact) => void
}

const chatStore = (set: any) => ({
  chats: [],
  setChats: (chats: IChat[]) => {
    set({ chats })
  },
  chatroomID: null,
  setChatroomID: (chatroomID: number | number) => {
    set({ chatroomID })
  },
  chatLog: {},
  setChatLog: (chatLog: IChat) => {
    set({ chatLog })
  },
  contact: {},
  setContact: (contact: IContact) => {
    set({ contact })
  },
})

const persistedChatStore: any = persist(chatStore, { name: 'CHATS' })
export const useChatStore = create<ChatStoreInterface>(persistedChatStore)
