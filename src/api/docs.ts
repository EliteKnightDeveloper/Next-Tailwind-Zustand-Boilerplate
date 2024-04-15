import { IDoc } from '@/interfaces'
import request from './request'

const docs = {
  getAllDocs: () => request.get<IDoc[]>('/docs/all'),

  getDoc: (docId: number) => request.get<IDoc>(`/doc/${docId}`),

  getDocsByAgent: (agentId: string) =>
    request.get<IDoc[]>(`docs/all/agent?agent_id=${agentId}`),

  getDocsByChat: (chatId: string) =>
    request.get<IDoc[]>(`docs/all/chat?chat_id=${chatId}`),

  getDocsByCompany: (companyId: string) =>
    request.get<IDoc[]>(`docs/all/company?company_id=${companyId}`),

  agentUrlUpload: (agentId: string, url: string) =>
    request.post<IDoc>(
      `docs/url_upload_to_agent?agent_id=${agentId}&url=${url}`,
      {}
    ),

  chatUrlUpload: (chatId: string, url: string) =>
    request.post<IDoc>(
      `docs/url_upload_to_chat?chat_id=${chatId}&url=${url}`,
      {}
    ),

  agentDocUpload: (agentId: string, file: File) => {
    const formData = new FormData()
    formData.append('files', file)
    return request.post<IDoc[]>(
      `docs/upload_to_agent?agent_id=${agentId}`,
      formData
    )
  },

  chatDocUpload: (chatId: string, file: File) => {
    const formData = new FormData()
    formData.append('files', file)
    return request.post<IDoc[]>(
      `docs/upload_to_chat?chat_id=${chatId}`,
      formData
    )
  },

  companyDocUpload: (companyId: string, file: FileList) => {
    const formData = new FormData()
    for (var i = 0; i < file.length; i++) {
      formData.append('files', file[i])
    }
    return request.post<IDoc[]>(
      `docs/url_upload_to_company?company_id=${companyId}`,
      formData
    )
  },

  deleteDoc: (docId: string) => request.delete(`/docs/${docId}`),

  deleteAllDocs: () => request.post(`/doc/deleteall`, {}),
}

export default docs
