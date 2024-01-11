import { IAgent } from '@/interfaces'
import request from './request'

const agents = {
  getAgent: (agentId: string) => request.get<IAgent>(`/agents/${agentId}`),

  getAllAgents: () => request.get<IAgent[]>('/agents/all/agents'),

  getAgentsByOwner: () => request.get<IAgent[]>(`/agents/all/user`),

  createAgent: (userId: number, agentData: IAgent, file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return request.post<IAgent>(
      `/agents?user_id=${userId}&name=${agentData.name}&role=${agentData.role}&objective=${agentData.objective}&tone=${agentData.tone}&welcome=${agentData.welcome}&prompt=&examples=${agentData.examples}`,
      formData
    )
  },

  updateAgent: (agentId: string, agentData: IAgent, file?: File) => {
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)
      return request.patch<IAgent>(
        `/agents/${agentId}?name=${agentData.name}&role=${agentData.role}&objective=${agentData.objective}&tone=${agentData.tone}&welcome=${agentData.welcome}&prompt=&examples=${agentData.examples}`,
        formData
      )
    }
    return request.patch<IAgent>(
      `/agents/${agentId}?name=${agentData.name}&role=${agentData.role}&objective=${agentData.objective}&tone=${agentData.tone}&welcome=${agentData.welcome}&prompt=&examples=${agentData.examples}`,
      {}
    )
  },

  duplicateAgent: (agentId: number, userId: number) =>
    request.post<IAgent>(
      `/agents/duplicate?agent_id=${agentId}&user_id=${userId}`,
      {}
    ),

  pinAgent: (agentId: number) =>
    request.post<IAgent>(`agents/toggle_pinned/${agentId}`, {}),

  archiveAgent: (agentId: number) =>
    request.delete<IAgent>(`/agents/${agentId}`),

  deleteAllAgentsByOwner: (userId: number) =>
    request.post(`/agents/deleteall_for_owner?user_id=${userId}`, {}),

  deleteAllAgents: () => request.post(`/agents/deleteall`, {}),
}

export default agents
