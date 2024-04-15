export interface IAgentWorkflow {
  id: string
  name: string
  role: string
  avatar: string
  workflows: { id: number; status: boolean; name: string }[]
}
