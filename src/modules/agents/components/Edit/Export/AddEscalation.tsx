import { FC, useState } from 'react'
import { Cross } from '@/common/components/Icons'
import Input from '@/common/elements/Input'
import Modal from '@/common/elements/Modal'
import Button from '@/common/elements/Button'
import { useRouter } from 'next/router'
import MultiSelect, { MultiSelectOption } from '@/common/elements/MultiSelect'
import { Channels } from '@/common/utils/constants'

interface AddEscalationProps {
  show: boolean
  showModal: (show: boolean) => void
}

const agent: MultiSelectOption[] = [
  { value: '0', label: 'Prem' },
  { value: '1', label: 'Steve' },
  { value: '2', label: 'Jason' },
]

const AddEscalation: FC<AddEscalationProps> = ({ show, showModal }) => {
  const [channelValue, setChannelValue] = useState<MultiSelectOption[]>([])
  const [agentValue, setAgentValue] = useState<MultiSelectOption[]>([])
  const router = useRouter()

  const addEscalation = () => {
    router.push('/agents/edit/escalation')
  }

  return (
    <Modal isOpen={show} onClose={() => showModal(show)}>
      <div className="flex flex-col w-[670px] p-6 rounded-xl">
        <div className="flex flex-row items-center justify-between">
          <span className="text-lg font-semibold text-white">
            Add Escalation
          </span>
          <div
            className="flex flex-col items-center justify-center text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={() => showModal(show)}
          >
            <Cross />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">Reason</span>
            <Input placeholder="I want to talk to a human" className="w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">Response</span>
            <Input
              placeholder="Certainly! Escalating to Manager"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-100">User</span>
            <MultiSelect
              options={agent}
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
              value={channelValue}
              options={Channels}
              onChange={(values) => {
                setChannelValue(values)
              }}
              placeholder="Select Escalation Channel"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-6">
          <Button
            text="Cancel"
            variant="text"
            onClick={() => showModal(show)}
          />
          <Button text="Add" variant="gradient" onClick={addEscalation} />
        </div>
      </div>
    </Modal>
  )
}

export default AddEscalation
