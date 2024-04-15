import { IAgent } from '@/interfaces'
import { create } from 'zustand'

interface AgentStoreInterface {
  agents: IAgent[]
  setAgents: (agents: IAgent[]) => void

  isLoading: boolean
  setLoading: (isLoading: boolean) => void

  isFetched: boolean
  setFetched: (isFetched: boolean) => void
}

const agentStore = (set: any) => ({
  agents: [],
  setAgents: (agents: IAgent[]) => set({ agents }),

  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),

  isFetched: false,
  setFetched: (isFetched: boolean) => set({ isFetched }),
})

export const useAgentStore = create<AgentStoreInterface>(agentStore)
