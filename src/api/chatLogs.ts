import request from './request'
import { IChat, IChatLogs, IContact } from '@/interfaces'

const chatLogs = {
  getChatLogsByOwner: (
    agentId: string,
    startdate: string,
    enddate: string,
    channels: string[]
  ) => {
    const channelsQueryString = channels
      .map((channel) => `channels=${encodeURIComponent(channel)}`)
      .join('&')

    return request.post<IChat[]>(
      `/chatlogs/agent/${agentId}?startdate=${startdate}&enddate=${enddate}&${channelsQueryString}`,
      {}
    )
  },

  getChatLogsByChatroomID: (chatroomID: number) =>
    request.post<IChatLogs>(`chatlogs/chatroom/${chatroomID}`, {}),

  getAllContacts: () =>
    request.post<IContact[]>('chatlogs/contacts?include_unknown=false', {}),
}

export default chatLogs
