import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AgentCard, { AgentCardSkeleton } from './AgentCard'
import api from '@/api'
import { IAgent } from '@/interfaces'
import { useUserStore } from '@/common/stores/userStore'
import { appLinks } from '@/common/utils/constants'
import { useChatStore } from '@/common/stores/chatStore'
import { usePopup } from '@/common/hooks/usePopup'
import Loading from '@/common/components/Loading'
import { useNotifications } from '@/hooks/useNotifications'

const AgentsByPlanSkeleton: FC = () => {
  const skeletons = []

  for (let i = 0; i < 8; ++i) {
    skeletons.push(<AgentCardSkeleton key={i} />)
  }

  return skeletons
}

const AgentsByPlan: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([])
  const [pinnedAgents, setPinnedAgents] = useState<IAgent[]>([])
  const [unpinnedAgents, setUnpinnedAgents] = useState<IAgent[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isDuplicating, setDuplicating] = useState(false)
  const [archived, setArchived] = useState(true)
  const [isNameModalOpen, setNameModalOpen] = useState(false)
  const user = useUserStore((state) => state.user)
  const [chats, setChats] = useChatStore((state) => [
    state.chats,
    state.setChats,
  ])
  const router = useRouter()
  const { showConfirm, hideConfirm } = usePopup()
  const [isChatCreating, setChatCreating] = useState<number>()
  const { addNotification } = useNotifications()

  useEffect(
    () => {
      setLoading(true)
      api.agents
        .getAgentsByOwner()
        .then((response) => {
          setAgents(response)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    setPinnedAgents(agents?.filter((agent) => agent.pinned))
    setUnpinnedAgents(agents?.filter((agent) => !agent.pinned))
  }, [agents])

  const toggleNameModalOpen = () => {
    setNameModalOpen(!isNameModalOpen)
  }

  const showArchivedAgents = () => {
    setArchived(!archived)
    const archivedAgents = agents.filter(
      (item: IAgent) => item.archived === archived
    )
    setAgents(archivedAgents!)
  }

  const duplicateAgent = (agentId: number) => {
    setDuplicating(true)
    api.agents
      .duplicateAgent(agentId, user!.id)
      .then((response) => {
        setAgents([...agents, response])
        setDuplicating(false)
        addNotification({
          type: 'Success',
          text: 'Duplicate Agent Success',
        })
      })
      .catch((error) => {
        setDuplicating(false)
        addNotification({
          type: 'Fail',
          text: 'Duplicate Agent Fail',
        })
      })
  }

  const deleteAgent = (agentId: number) => {
    api.agents
      .archiveAgent(agentId)
      .then(() => {
        agents.map((agent) =>
          agent.id == agentId
            ? {
                ...agent,
                archived: true,
              }
            : agent
        )
        addNotification({
          type: 'Success',
          text: 'Archive Agent Success',
        })
      })
      .catch(() => {
        addNotification({
          type: 'Fail',
          text: 'Archive Agent Fail',
        })
      })
  }

  const onClickChat = (agent: IAgent) => {
    setChatCreating(agent.id)
    api.chats
      .createChat({
        name: 'Untitled',
        agent_id: agent.id,
      })
      .then((data) => {
        setChats([...chats, data.chat])
        setChatCreating(-1)
        toggleNameModalOpen()
        router.push(`${appLinks.chat}/${data.chat.id}`)
        localStorage.setItem('is-first-query', 'true')
        addNotification({
          type: 'Success',
          text: 'Chat Create Success',
        })
      })
      .catch(() => {
        toggleNameModalOpen()
        setChatCreating(-1)
        addNotification({
          type: 'Fail',
          text: 'Chat Create Fail',
        })
      })
  }

  const onDeleteAgent = (agentId: number) => {
    showConfirm({
      title: 'Delete this AI agent?',
      confirmText: 'Delete',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        hideConfirm()
        deleteAgent(agentId)
      },
    })
  }

  const pinAgent = (agentId: number) => {
    setAgents(
      agents.map((agent) =>
        agent.id === agentId ? { ...agent, pinned: !agent.pinned } : agent
      )
    )
  }

  return (
    <div className="py-3">
      <div className="items-start mt-11">
        {isLoading ? (
          <div className="grid gap-6 lg:grid-cols-4 max-md:grid-cols-1 md:grid-cols-2 gap-y-16">
            <AgentsByPlanSkeleton />
          </div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-4 max-md:grid-cols-1 md:grid-cols-2 gap-y-16">
              {pinnedAgents.map((agent: IAgent, id: number) => {
                return (
                  <AgentCard
                    data={agent}
                    key={id}
                    onDulicate={() => duplicateAgent(agent.id)}
                    onDelete={() => onDeleteAgent(agent.id)}
                    pinAgent={() => pinAgent(agent.id)}
                    onClickChat={() => {
                      onClickChat(agent)
                    }}
                    isCreatingChat={isChatCreating === agent.id}
                  />
                )
              })}
            </div>
            {pinnedAgents.length !== 0 && unpinnedAgents.length !== 0 && (
              <div className="my-16 pin-divider"></div>
            )}
            <div className="grid gap-6 lg:grid-cols-4 max-md:grid-cols-1 md:grid-cols-2 gap-y-16">
              {unpinnedAgents
                .filter((agent) => !agent.pinned)
                .map((agent: IAgent, id: number) => {
                  return (
                    <AgentCard
                      data={agent}
                      key={id}
                      onDulicate={() => duplicateAgent(agent.id)}
                      onDelete={() => onDeleteAgent(agent.id)}
                      pinAgent={() => pinAgent(agent.id)}
                      onClickChat={() => {
                        onClickChat(agent)
                      }}
                      isCreatingChat={isChatCreating === agent.id}
                    />
                  )
                })}
            </div>
          </>
        )}
        {isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {isDuplicating && <AgentCardSkeleton />}
      </div>
    </div>
  )
}

export default AgentsByPlan
