import { FC } from 'react'
import { Cross } from '@/common/components/Icons'
import Modal, { ModalProps } from '@/common/elements/Modal'
import TabWidget from '@/common/elements/TabWidget'
import Documents from './Documents'
import Info from './Info'

const EditCompany: FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col p-6 w-[810px] max-sm:w-[335px] max-sm:p-4">
        <div className="flex flex-row justify-between w-full">
          <span className="text-lg font-semibold text-white max-sm:text-base">
            Edit Company Info
          </span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={onClose}
          >
            <Cross />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 max-sm:mt-6">
          <TabWidget
            tabs={[
              {
                title: 'General Info',
                content: <Info />,
              },
              {
                title: 'Documents',
                content: <Documents />,
              },
              // {
              //   title: 'Social Accounts',
              //   content: <SocialAccounts />,
              // },
            ]}
            activeTab={0}
          />
        </div>
      </div>
    </Modal>
  )
}

export default EditCompany
