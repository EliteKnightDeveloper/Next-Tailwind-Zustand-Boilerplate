import { ROLE } from '@/common/utils/constants'

export type UserRole = 'admin' | 'user'

export interface IUser {
  uuid: string
  id: string
  email: string
  phone: string
  name: string
  role: ROLE
  image: string
  business_profile: string
  disabled: boolean
  timezone: string
  subscription_id: number
  chatrooms: []
  agents: []
}

export interface CreateUserInput {
  name: string
  email: string
  role: string
}
