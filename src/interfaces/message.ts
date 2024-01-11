export interface IMessage {
  isAgent: boolean
  message: string
  role?: string
  response?: string
  image?: string
  isStreaming?: boolean
  mode?: boolean
  testNode?: boolean
}
