import { IAgent } from '@/interfaces'
import request from './request'

const agents = {
  getAgent: (agentId: string) => request.get<IAgent>(`/agents/${agentId}`),

  getAllAgents: () => request.get<IAgent[]>('/agents/all/agents'),

  createAgent: (userId: string, agentData: IAgent, file: File) => {
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

  duplicateAgent: (agentId: string, userId: string) =>
    request.post<IAgent>(
      `/agents/duplicate?agent_id=${agentId}&user_id=${userId}`,
      {}
    ),

  pinAgent: (agentId: string) =>
    request.post<IAgent>(`agents/toggle_pinned/${agentId}`, {}),

  archiveAgent: (agentId: string) =>
    request.delete<IAgent>(`/agents/${agentId}`),

  deleteAllAgentsByOwner: (userId: string) =>
    request.post(`/agents/deleteall_for_owner?user_id=${userId}`, {}),

  deleteAllAgents: () => request.post(`/agents/deleteall`, {}),
}

export default agents
