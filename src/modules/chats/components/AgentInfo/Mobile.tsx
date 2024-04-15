import { FC, Fragment, useEffect, useState } from 'react'
import { ChatLog, CircleLink, File, Task } from '@/common/components/Icons'
import CollapsableCard from './CollapsableCard'
import { IAgent } from '@/interfaces'
import Document from './Document'
import TaskList from './TaskList'
import { useDocStore } from '@/common/stores/docStore'
import api from '@/api'
import { useRouter } from 'next/router'

interface AgentInfoProps {
  agent: IAgent
  isLoading: boolean
}

const AgentInfo: FC<AgentInfoProps> = ({ agent, isLoading }) => {
  const [panelType, setPanelType] = useState('')
  const router = useRouter()
  const { query: queryParam } = useRouter()

  const setPanel = (type: string) => {
    setPanelType(type)
  }

  const [docs, setDocs] = useDocStore((state) => [state.docs, state.setDocs])

  useEffect(
    () => {
      api.docs
        .getDocsByChat(queryParam.id?.toString() || '')
        .then((response) => {
          setDocs(response)
        })
        .catch(() => {})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [agent.id]
  )

  const agentChatLog = () => {
    router.push(`/conversations/${agent.id}`, undefined, { shallow: true })
  }

  return (
    <div className="relative flex flex-col w-full px-6 py-6 lg:full-height max-sm:bg-[#0B0C0E] max-sm:border-t-gray-500 border-t transition-all max-sm:py-3 flex-1">
      {panelType === '' && (
        <Fragment>
          <div className="z-[100] flex flex-col gap-3">
            <CollapsableCard title="Chat information">
              <span className="text-xs text-gray-400">
                View history and current task lists of your Agent.
              </span>
              {agent.deployed ? (
                <button
                  className="flex items-center gap-2 mx-1 mt-3 mb-2 text-white"
                  onClick={agentChatLog}
                >
                  <ChatLog />
                  <span className="text-sm text-gray-100">Chat Log</span>
                </button>
              ) : (
                <h3 className="text-sm text-white mt-3">Not Deployed</h3>
              )}
              {/* <button
                className="flex items-center gap-2 mx-1 my-2 text-white"
                onClick={() => setPanel('task')}
              >
                <Task />
                <span className="text-sm text-gray-100">Task List</span>
              </button> */}
            </CollapsableCard>
            <CollapsableCard title="Documents">
              <span className="text-xs font-normal text-gray-400">
                Upload documents that you want your Agent to have access to
              </span>
              <button
                className="flex items-center gap-2 mx-1 mt-3 mb-2"
                onClick={() => setPanel('file')}
              >
                <File />
                <span className="text-sm text-gray-100">Files</span>
                <span className="text-sm text-gray-100">
                  {docs.filter((doc) => doc.type === 'file').length}
                </span>
              </button>
              <button
                className="flex items-center gap-2 mx-1 my-2 text-white"
                onClick={() => setPanel('link')}
              >
                <CircleLink />
                <span className="text-sm text-gray-100">Links</span>
                <span className="text-sm text-gray-100">
                  {docs.filter((doc) => doc.type === 'url').length}
                </span>
              </button>
            </CollapsableCard>
          </div>
        </Fragment>
      )}
      {panelType === 'file' && (
        <Document
          agentId={agent.id.toString()}
          docs={docs}
          onBack={() => setPanel('')}
          active={0}
        />
      )}
      {panelType === 'link' && (
        <Document
          agentId={agent.id.toString()}
          docs={docs}
          onBack={() => setPanel('')}
          active={1}
        />
      )}
      {panelType === 'chat' && <div>s</div>}
      {panelType === 'task' && (
        <TaskList agentId={agent.id} onBack={() => setPanel('')} />
      )}
    </div>
  )
}

export default AgentInfo
