import request from './request'

interface CORSBack {
  cors_domains: string[]
}

const cors = {
  add: (domain: string) => request.post(`/cors/add?domain=${domain}`, {}),
  remove: (domain: string) => request.post(`/cors/remove?domain=${domain}`, {}),
  getAll: () => request.get<CORSBack>('/cors/list'),
}

export default cors
