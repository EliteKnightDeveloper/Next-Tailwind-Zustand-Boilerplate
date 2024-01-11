import request from './request'
import { IChat, IAgent } from '@/interfaces'

const chats = {
  getChats: () => request.get<IChat[]>('/chatrooms'),

  getChatsByOwner: (userId: number) =>
    request.get<IChat[]>(`/chatrooms/user/${userId}`),

  createChat: (data: { name: string; agent_id: number }) =>
    request.post<{
      chat: IChat
      participants: IAgent[]
    }>('/chatrooms/create', data),

  renameChat: (chatId: number, name: string) =>
    request.post<IChat>(`/chatrooms/${chatId}/rename`, name),

  deleteChat: (chatId: number) =>
    request.delete<string>(`/chatrooms/${chatId}/delete`),

  getMessages: (chatId: number) =>
    request.get<{
      chat: IChat
      participants: IAgent[]
    }>(`/chatrooms/${chatId}/messages`),
}

export default chats
