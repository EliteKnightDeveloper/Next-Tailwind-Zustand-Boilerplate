export interface IAgent {
  id: string
  name: string
  plan: string
  role: string
  image: string
  objective: string
  welcome: string
  examples: string
  tone: string
  user: number
  docs: unknown[]
  archived: boolean
  deployed: boolean
  pinned: boolean
}
