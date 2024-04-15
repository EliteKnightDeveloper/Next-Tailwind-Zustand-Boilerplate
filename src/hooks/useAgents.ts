import api from '@/api'
import { useAgentStore } from '@/common/stores/agentStore'
import { IAgent } from '@/interfaces'
import { useEffect, useState } from 'react'
import { useNotifications } from './useNotifications'
import { useUserStore } from '@/common/stores/userStore'
import { useGlobalStore } from '@/common/stores/globalStore'

export const useAgents = () => {
  const [isSignedIn] = useGlobalStore((state) => [state.isSignedIn])
  const [agents, setAgents, isLoading, setLoading, isFetched, setFetched] =
    useAgentStore((state) => [
      state.agents,
      state.setAgents,
      state.isLoading,
      state.setLoading,
      state.isFetched,
      state.setFetched,
    ])
  const { addNotification } = useNotifications()
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    if (isFetched || !isSignedIn) return
    setLoading(true)

    api.agents
      .getAllAgents()
      .then((data) => {
        setAgents(data)
        setLoading(false)
        setFetched(true)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const pinAgent = (agentId: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === agentId ? { ...agent, pinned: !agent.pinned } : agent
      )
    )
  }

  const deleteAgent = (agentId: string) => {
    return new Promise((resolve) => {
      api.agents
        .archiveAgent(agentId)
        .then(() => {
          setAgents(
            agents.map((agent) =>
              agent.id == agentId
                ? {
                    ...agent,
                    archived: true,
                  }
                : agent
            )
          )
          addNotification({
            type: 'Success',
            text: 'Archive Agent Success',
          })
          resolve(true)
        })
        .catch(() => {
          addNotification({
            type: 'Fail',
            text: 'Archive Agent Fail',
          })
          resolve(true)
        })
    })
  }

  const createAgent = (agent: IAgent, file: File) => {
    return new Promise<IAgent>((resolve, reject) => {
      api.agents
        .createAgent(user!.id, agent, file!)
        .then((data) => {
          addNotification({
            type: 'Success',
            text: 'Agent Create Success',
          })
          resolve(data)
          setAgents([...agents, data])
        })
        .catch(() => {
          addNotification({
            type: 'Fail',
            text: 'Agent Create Fail',
          })
          reject()
        })
    })
  }

  const setAgentDeployed = (agentId: string, deployed: boolean) => {
    setAgents(
      agents.map((agent) =>
        agent.id === agentId ? { ...agent, deployed } : agent
      )
    )
  }

  const updateAgent = (agentId: string, updatedAgent: IAgent, file?: File) => {
    return new Promise<IAgent>((resolve, reject) => {
      api.agents
        .updateAgent(agentId, updatedAgent, file)
        .then((response) => {
          setAgents(
            agents.map((agent) => (agent.id == agentId ? response : agent))
          )
          resolve(response)
        })
        .catch(() => {
          reject()
        })
    })
  }

  return {
    agents,
    isLoading,
    createAgent,
    updateAgent,
    deleteAgent,
    pinAgent,
    setAgentDeployed,
  }
}
