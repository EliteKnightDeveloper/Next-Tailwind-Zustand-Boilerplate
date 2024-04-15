import { IAgent, IChat, IContact } from '@/interfaces'
import { FC, Fragment, useState } from 'react'
import { ContactsDataModal } from './ContactsDataModal'
import api from '@/api'
import { formatNumber } from '@/common/utils/date'
import { useChatStore } from '@/common/stores/chatStore'

interface ContactsCardProps {
  data: IContact
}

const ContactsCard: FC<ContactsCardProps> = ({ data }) => {
  const [show, setShow] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [agent, setAgentInfo] = useState<IAgent>({
    id: '',
    image: '',
    objective: '',
    name: '',
    role: '',
    tone: '',
    archived: false,
    docs: [],
    examples: '',
    plan: '',
    welcome: '',
    user: 0,
    deployed: false,
    pinned: false,
  })
  const [setContact] = useChatStore((state) => [state.setContact])

  const showModal = (data: IContact) => {
    api.chats.getMessages(data.chat_id).then((resp) => {
      setMessages(resp.chat.messages)
      setAgentInfo(resp.participants[0])
      setShow(!show)
    })
    const updatedData = { ...data, agentName: agent.name }
    setContact(updatedData)
  }

  return (
    <Fragment>
      <div className="flex flex-col w-full gap-2 px-6 py-4 form-container ">
        <div
          className="z-10 flex flex-row gap-2 hover:cursor-pointer"
          onClick={() => showModal(data)}
        >
          <span className="text-sm font-semibold text-neon-100">
            {data.customer_name === 'Unknown' ? 'Customer' : data.customer_name}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-slate-200 w-[100px]">Channel</span>
          <span className="text-sm font-normal text-slate-200">
            {data.channel_type}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-slate-200 w-[100px]">Agent Name</span>
          <span className="text-sm font-normal text-slate-200">
            {data.agent_name}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-slate-200 w-[100px]">
            Interaction Time
          </span>
          <span className="text-sm font-normal text-slate-200">
            {formatNumber(data.interaction_time)}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-slate-200 w-[100px]">
            Total Credits Used:
          </span>
          <span className="text-sm font-normal text-slate-200">--</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-200 w-[100px]">Message</span>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-slate-200 font-semibold">
              {data.messages[0]}
            </span>
            <span
              className="text-sm text-slate-200 font-semibold document-body"
              dangerouslySetInnerHTML={{ __html: data.messages[1] }}
            ></span>
          </div>
        </div>
      </div>
      <ContactsDataModal
        isOpen={show}
        onClose={() => setShow(!show)}
        messages={messages}
        agent={agent}
        data={data}
      />
    </Fragment>
  )
}

export default ContactsCard
