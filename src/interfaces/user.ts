export type UserRole = 'admin' | 'user'

export interface IUser {
  uuid: string
  id: number
  email: string
  phone: string
  name: string
  role: string
  image: string
  business_profile: string
  disabled: boolean
  timezone: string
  subscription_id: number
  chatrooms: []
  agents: []
}
