import { CreateUserInput, IUser } from '@/interfaces'
import request from './request'
import { ROLE } from '@/common/utils/constants'

const agents = {
  createUser: (input: CreateUserInput) =>
    request.post<IUser>('/users/create', input),

  getCurrentUser: () => request.get<IUser>('/users/me'),

  getUsers: () => request.get<IUser[]>(`/users`),

  getUser: (userId: string) => request.get<IUser>(`/users/${userId}`),

  deleteUser: (userId: string) => request.delete(`/users/${userId}`),

  updateUser: (
    userId: string,
    userData: {
      role: ROLE
    }
  ) => request.put<IUser>(`/users/${userId}`, userData),

  deleteAllUsers: () => request.post(`/users/deleteAll`, {}),

  transferOwnership: (userId: string) =>
    request.post<IUser>(`/users/transfer-ownership/${userId}`, {}),
}

export default agents
