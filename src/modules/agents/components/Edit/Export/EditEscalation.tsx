import { FC, useState } from 'react'
import { Cross } from '@/common/components/Icons'
import Input from '@/common/elements/Input'
import Modal from '@/common/elements/Modal'
import Button from '@/common/elements/Button'
import Select, { IOption } from '@/common/elements/Select'
import MultiSelect, { MultiSelectOption } from '@/common/elements/MultiSelect'

interface Escalation {
  reason: string
  response: string
  user: string
  escalation: string
}

interface EditEscalationProps {
  show: boolean
  showModal: (show: boolean) => void
  data?: Escalation
}

const channels: MultiSelectOption[] = [
  { value: '0', label: 'Whatsapp' },
  { value: '1', label: 'Email' },
]

const agents: MultiSelectOption[] = [
  { value: '0', label: 'Prem' },
  { value: '1', label: 'Steve' },
  { value: '2', label: 'Jason' },
]
const EditEscalation: FC<EditEscalationProps> = ({ show, showModal, data }) => {
  const [channelValue, setChannelValue] = useState<MultiSelectOption[]>([])
  const [agentValue, setAgentValue] = useState<MultiSelectOption[]>([])

  return (
    <Modal isOpen={show} onClose={() => showModal(show)}>
      <div className="flex flex-col w-[670px] p-6 rounded-xl">
        <div className="flex flex-row items-center justify-between">
          <span className="text-lg font-semibold text-white">
            Edit Escalation
          </span>
          <div
            className="flex flex-col items-center justify-center text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={() => showModal(show)}
          >
            <Cross />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">Reason</span>
            <Input className="w-full" value={data?.reason} />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">Response</span>
            <Input className="w-full" value={data?.reason} />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">User</span>
            <MultiSelect
              options={agents}
              placeholder="Select User"
              value={agentValue}
              onChange={(values) => {
                setAgentValue(values)
              }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">
              Escalation Channel
            </span>
            <MultiSelect
              options={channels}
              placeholder="Select User"
              value={channelValue}
              onChange={(values) => {
                setChannelValue(values)
              }}
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-3">
            <Button
              text="Cancel"
              variant="text"
              onClick={() => showModal(show)}
            />
            <Button text="Edit" variant="gradient" />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditEscalation
