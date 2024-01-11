import { IIntegration, IQuery } from '@/interfaces'
import request, { integrationsRequest } from './request'

const integrationsUrl = process.env.NEXT_PUBLIC_INTEGRATIONS_API_URL

const integrationsWebUI = {
  webUI: (chatId: string, input: string) => {
    const payload = {
      message: input,
      agent_id: '533c090b-f380-46ab-8c47-39738142c20b', // TODO: default deployed task, change when we have them dynamic
      session_id: chatId,
    }
    return integrationsRequest.post<IQuery>(`/web_ui`, payload)
  },

  saveWhatsAppNumber: (agent_id: string, numbers: string[]) =>
    integrationsRequest.post<{
      numbers: string[]
    }>(`/whatsapp/${agent_id}`, { numbers }),

  getWhatsAppNumber: (agentId: string) =>
    integrationsRequest.get<
      {
        agent_id: number
        number: string
      }[]
    >(`/whatsapp/${agentId}`),

  removeWhatsAppNumber: (agentId: string, numbers: string[]) =>
    integrationsRequest.patch(`/whatsapp/${agentId}`, { numbers }),

  SSE: (chatId: string) => {
    const sseUrl = `${integrationsUrl}/web_ui/${chatId}`
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
