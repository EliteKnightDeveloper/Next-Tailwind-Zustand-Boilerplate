import request from './request'

interface CreateInput {
  agent_id: string
  welcome_message: string
  contact_fields: string[]
}

interface CreateOutput {
  agent_id: string
  welcome_message: string
  id: string
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
