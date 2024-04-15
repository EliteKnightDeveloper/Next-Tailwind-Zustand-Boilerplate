import request from './request'
import { IChat, IAgent } from '@/interfaces'

const chats = {
  getChats: () => request.get<IChat[]>('/chatrooms'),

  getChatsByOwner: (userId: string) =>
    request.get<IChat[]>(`/chatrooms/user/${userId}`),

  getRecentChats: (userId: string) =>
    request.get<IChat[]>(`/chatrooms/recent/user/${userId}`),

  createChat: (data: { name: string; agent_id: string }) =>
    request.post<IChat>('/chatrooms/create', data),

  renameChat: (chatId: string, name: string) =>
    request.post<{
      chat: IChat
    }>(`/chatrooms/${chatId}/rename`, name),

  summarizeChat: (chatId: string) =>
    request.post<{
      chat: IChat
    }>(`/chatrooms/${chatId}/rename`, ''),

  deleteChat: (chatId: string) =>
    request.delete<string>(`/chatrooms/${chatId}/delete`),

  getMessages: (chatId: string) =>
    request.get<{
      chat: IChat
      participants: IAgent[]
    }>(`/chatrooms/${chatId}/messages`),
}

export default chats
