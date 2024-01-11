import { IUser } from '@/interfaces'
import request from './request'

const agents = {
  getCurrentUser: () => request.get<IUser>('/users/me'),

  getUsers: () => request.get<IUser[]>(`/users`),

  getUser: (userId: number) => request.get<IUser>(`/users/${userId}`),

  deleteUser: (userId: number) => request.delete(`/users/${userId}`),

  updateUser: (userId: number, userData: IUser) =>
    request.put<IUser>(`/users/${userId}`, userData),

  deleteAllUsers: () => request.post(`/users/deleteAll`, {}),
}

export default agents
