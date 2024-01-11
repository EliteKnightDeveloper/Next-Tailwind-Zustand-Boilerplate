import request from './request'

interface CreateInput {
  agent_id: number
  welcome_message: string
}

interface CreateOutput {
  agent_id: number
  welcome_message: string
  id: number
}

const webwidget = {
  create: (input: CreateInput) =>
    request.post<CreateOutput>('/webwidget/create-webwidget', input),
  isDeployed: (agentId: string) =>
    request.get<boolean>(`/webwidget/is-deployed/${agentId}`),
  remove: (agentId: string) =>
    request.delete(`/webwidget/remove-all-webwidgets/${agentId}`),
}

export default webwidget
