import { IAgent } from '.'

export interface IChat {
  id: string
  name: string
  user_id: string
  primary_agent_id: string
  primary_agent_name: string
  memory_id: string
  messages: string[]
  start_time: string
  end_time: string
  channel: string
  interaction_time: number
  participants: IAgent[]
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
  chat_id: string
  customer_name: string
  agent_name: string
  interaction_time: number
  messages: string[]
  channel_type: string
}
