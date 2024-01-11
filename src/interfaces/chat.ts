import { IAgent } from '.'

export interface IChat {
  id: number
  name: string
  user_id: string
  primary_agent_id: string
  memory_id: string
  messages: string[]
  start_time: string
  end_time: string
  channel: string
  interaction_time: number
}

export type Id = string

export type Task = {
  id: Id
  title: string
  content: string
}

export interface IChatLogs {
  chat: IChat
  participants: IAgent[]
}

export interface IContact {
  chat_id: number
  customer_name: string
  agent_name: string
  interaction_time: number
  messages: string[]
  channel_type: string
}
