export interface IAgentWorkflow {
  id: number
  name: string
  role: string
  avatar: string
  workflows: { id: number; status: boolean; name: string }[]
}
