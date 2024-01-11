import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { classNames } from '@/common/utils'

export interface ModalProps
  extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactElement | React.ReactElement[] | string
  isStatic?: boolean
  size?: string
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  isStatic = false,
  size = 'w-fit',
}) => (
  <Fragment>
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1000]"
        onClose={() => {
          if (isStatic) return
          onClose()
        }}
      >
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
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'relative transform rounded-2xl bg-[#111315] text-left transition-all',
                  className ? className : '',
                  size
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  </Fragment>
)

export default Modal
