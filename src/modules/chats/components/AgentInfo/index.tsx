import { FC, Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  ChatLog,
  CircleLink,
  Collapse,
  ChatEdit,
  Expand,
  File,
  Task,
} from '@/common/components/Icons'
import Avatar from '@/common/elements/Avatar'
import { useThemeStore } from '@/common/stores/themeStore'
import CollapsableCard from './CollapsableCard'
import { IAgent } from '@/interfaces'
import Skeleton from '@/common/elements/Skeleton'
import Document from './Document'
import TaskList from './TaskList'
import { ImageUrl } from '@/common/utils/constants'
import api from '@/api'
import { useDocStore } from '@/common/stores/docStore'

interface AgentInfoProps {
  agent: IAgent
  isLoading: boolean
  msgs: number
}

const AgentInfo: FC<AgentInfoProps> = ({ agent, isLoading, msgs }) => {
  const [panelType, setPanelType] = useState('')
  const router = useRouter()
  const { query: queryParam } = useRouter()

  const [isProfilebarOpened, setProfilebarOpened] = useThemeStore((state) => [
    state.isProfilebarOpened,
    state.setProfilebarOpened,
  ])
  const [docs, setDocs] = useDocStore((state) => [state.docs, state.setDocs])

  const editAgent = () => {
    router.push(`/agents/edit/${agent.id}`, undefined, { shallow: true })
  }

  const setPanel = (type: string) => {
    setPanelType(type)
  }

  const agentChatLog = () => {
    router.push(`/conversations/${agent.id}`, undefined, { shallow: true })
  }

  useEffect(
    () => {
      if (agent.id !== '')
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

  return (
    <div className="z-10 flex flex-col w-full px-6 py-3 full-height">
      {panelType === '' && (
        <div className="flex justify-between w-full">
          <div
            className="p-2 text-white bg-gray-600 hover:text-neon-100 rounded-xl hover:cursor-pointer h-fit"
            onClick={() => {
              setProfilebarOpened(!isProfilebarOpened)
            }}
          >
            {isProfilebarOpened ? <Expand /> : <Collapse />}
          </div>
          {isProfilebarOpened && (
            <button
              className="p-2 text-white bg-gray-600 hover:text-neon-100 rounded-xl"
              onClick={editAgent}
            >
              <ChatEdit />
            </button>
          )}
        </div>
      )}
      {isProfilebarOpened && panelType === '' && (
        <Fragment>
          <div className="flex flex-col items-center gap-2 mt-6">
            {isLoading || !agent.image ? (
              <div className="w-[80px] h-[80px]">
                <Skeleton width="fit" height="fit" variant="avatar" isLoading />
              </div>
            ) : (
              <Avatar
                src={ImageUrl + '/' + agent.image}
                alt={''}
                width={52}
                height={52}
                border
                isHuman={false}
                className="w-[80px] h-[80px]"
              />
            )}
            {isLoading ? (
              <div className="w-[100px] h-[12px]">
                <Skeleton
                  width="full"
                  height="full"
                  isLoading
                  variant="rectangular"
                />
              </div>
            ) : (
              <span className="text-lg font-bold text-white">{agent.name}</span>
            )}
            {isLoading ? (
              <div className="w-[150px] h-[16px] mt-2">
                <Skeleton
                  width="full"
                  height="full"
                  isLoading
                  variant="rectangular"
                />
              </div>
            ) : (
              <span className="text-lg font-normal text-gray-300 document-body">
                {agent.role}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-6">
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
                  <span className="text-sm font-semibold text-gray-100">
                    {msgs + 1}
                  </span>
                </button>
              ) : (
                <h3 className="text-sm text-white mt-4">Not Deployed</h3>
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
                <span className="text-sm font-semibold text-gray-100">
                  {docs.filter((doc) => doc.type === 'file').length}
                </span>
              </button>
              <button
                className="flex items-center gap-2 mx-1 my-2 text-white"
                onClick={() => setPanel('link')}
              >
                <CircleLink />
                <span className="text-sm text-gray-100">Links</span>
                <span className="text-sm font-semibold text-gray-100">
                  {docs.filter((doc) => doc.type === 'url').length}
                </span>
              </button>
            </CollapsableCard>
          </div>
        </Fragment>
      )}
      {isProfilebarOpened && panelType === 'file' && (
        <Document
          agentId={agent.id.toString()}
          docs={docs}
          onBack={() => setPanel('')}
          active={0}
        />
      )}
      {isProfilebarOpened && panelType === 'link' && (
        <Document
          agentId={agent.id.toString()}
          docs={docs}
          onBack={() => setPanel('')}
          active={1}
        />
      )}
      {isProfilebarOpened && panelType === 'chat' && <div>s</div>}
      {isProfilebarOpened && panelType === 'task' && (
        <TaskList agentId={agent.id} onBack={() => setPanel('')} />
      )}
    </div>
  )
}

export default AgentInfo
