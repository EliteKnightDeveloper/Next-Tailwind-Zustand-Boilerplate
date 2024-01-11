import { Fragment, FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TrashAgent } from '../Icons'
import Button from '@/common/elements/Button'

export interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  isConfirming?: boolean
  confirmText: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  isConfirming,
  title,
  confirmText,
  message,
  onConfirm,
  onCancel,
}) => (
  <Transition.Root show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-[1000]" onClose={() => false}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-[#1E1E1E55] backdrop-blur-md transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-[1000] overflow-y-auto">
        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-[#111315] p-8 text-left shadow-xl transition-all sm:w-full sm:max-w-lg max-sm:p-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full text-center 2xl:mt-6 sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="w-full text-2xl font-medium leading-10 text-center text-white"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="flex justify-center mt-3">
                    <TrashAgent />
                  </div>
                  <div className="flex justify-center mt-5">
                    <p className="text-sm text-white text-center max-w-[250px]">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between px-2 mt-5 sm:mt-4 sm:flex">
                <Button
                  text={confirmText}
                  variant="text"
                  color="red"
                  onClick={onConfirm}
                  disabled={isConfirming}
                  isLoading={isConfirming}
                />
                <Button text="Cancel" onClick={onCancel} />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
)

ConfirmModal.defaultProps = {
  isConfirming: false,
}

export default ConfirmModal
