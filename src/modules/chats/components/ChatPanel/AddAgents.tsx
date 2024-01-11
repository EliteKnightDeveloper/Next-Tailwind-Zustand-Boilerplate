import { FC, Fragment } from 'react'
import Modal, { ModalProps } from '@/common/elements/Modal'
import TabWidget from '@/common/elements/TabWidget'
import AIAgents from './AIAgents'
import { Cross } from '@/common/components/Icons'

interface AddAgentsProps extends ModalProps {
  onAddAgents: () => void
}

const AddAgents: FC<AddAgentsProps> = ({ isOpen, onClose, onAddAgents }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="w-[70%]">
    <div className="p-6">
      <div className="flex justify-between text-lg font-bold">
        <p className="text-lg font-semibold text-white">
          Start
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-darkGradientStart to-darkGradientEnd">
            Multi-Agent
          </span>
          Chat
        </p>
        <div
          className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
          onClick={onClose}
        >
          <Cross />
        </div>
      </div>

      <div className="mt-8">
        <TabWidget
          tabs={[
            {
              title: 'Agents',
              content: <AIAgents onAddAgents={onAddAgents} />,
            },
            {
              title: 'People',
              content: <Fragment></Fragment>,
            },
          ]}
          activeTab={0}
        />
      </div>
    </div>
  </Modal>
)

export default AddAgents
