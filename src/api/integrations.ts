import { IIntegration, IQuery } from '@/interfaces'
import request, { integrationsRequest } from './request'

const integrationsWebUI = {
  webUI: (chatId: string, input: string) => {
    const payload = {
      message: input,
      agent_id: '533c090b-f380-46ab-8c47-39738142c20b', // TODO: default deployed task, change when we have them dynamic
      session_id: chatId,
    }
    return integrationsRequest.post<IQuery>(`/web_ui`, payload)
  },

  saveWhatsAppNumber: (data: {
    agent_id: string
    agentNumber: string
    customerNumbers: string[]
    usernames: string[]
    allow_everyone: boolean
  }) =>
    integrationsRequest.post<{
      response: string
      status: 'Failed' | 'Success'
    }>(`/whatsapp/${data.agent_id}`, {
      agentNumbers: [data.agentNumber],
      customerNumbers: data.customerNumbers,
      usernames: data.usernames,
      allow_everyone: data.allow_everyone,
    }),

  getWhatsAppNumber: (agentId: string) =>
    integrationsRequest.get<WhatsAppNumber[]>(`/whatsapp/${agentId}`),

  removeWhatsAppNumber: (data: {
    agent_id: string
    agentNumber: string
    customerNumbers: string[]
    usernames: string[]
    allow_everyone: boolean
  }) =>
    integrationsRequest.patch(`/whatsapp/${data.agent_id}`, {
      agentNumbers: [data.agentNumber],
      customerNumbers: data.customerNumbers,
      usernames: data.usernames,
      allow_everyone: data.allow_everyone,
    }),

  SSE: (tenant: string, chatId: string) => {
    const sseUrl = `https://${tenant}.azara-ai.com:8000/blackbox/web_ui/${chatId}`
    return new EventSource(sseUrl)
  },

  getAllIntegrations: () => request.get<IIntegration[]>('/integrations'),

  getIntegration: (integrationPk: string) =>
    request.get<IIntegration>(`/integrations/${integrationPk}`),

  deleteIntegration: (integrationPk: string) =>
    request.delete(`/integrations/${integrationPk}`),

  deleteAllDocs: () => request.post(`/integrations/deleteall`, {}),
}

export default integrationsWebUI
