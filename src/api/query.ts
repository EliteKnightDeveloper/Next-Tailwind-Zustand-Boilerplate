import { IQuery } from '@/interfaces'
import request from './request'

const query = {
  query: (chatId: string, input: string) =>
    request.post<IQuery>(`/query?chat_id=${chatId}&input=${input}`, {}),
}

export default query
