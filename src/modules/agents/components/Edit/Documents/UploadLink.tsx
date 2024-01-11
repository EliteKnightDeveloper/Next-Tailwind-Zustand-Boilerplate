import { FC, useEffect, useState } from 'react'
import { Cross } from '@/common/components/Icons'
import Modal, { ModalProps } from '@/common/elements/Modal'
import Input from '@/common/elements/Input'
import Button from '@/common/elements/Button'

interface UploadLinkProps extends ModalProps {
  upload: (url: string) => void
  status: boolean
}

const UploadLink: FC<UploadLinkProps> = ({
  isOpen,
  onClose,
  upload,
  status,
}) => {
  const [url, setURL] = useState('')
  const onSubmit = () => {
    if (!url) return
    upload('https://' + url)
  }

  useEffect(() => {
    setURL('')
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[600px] max-sm:w-full p-6">
        <div className="flex justify-between gap-2">
          <span className="text-lg font-semibold text-white">Upload Link</span>
          <div
            className="flex text-gray-300 hover:cursor-pointer hover:text-neon-100"
            onClick={onClose}
          >
            <Cross />
          </div>
        </div>
        <div className="flex items-center mt-6">
          <span className="text-sm font-medium text-white">Link Web Pages</span>
        </div>
        <div className="flex flex-col w-full gap-2 mt-2">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 z-[1] flex items-center justify-center pl-2 text-sm text-white">
              https://
            </div>
            <Input
              type="text"
              placeholder="Enter the url"
              className="w-full pl-[54px]"
              value={url}
              onChange={(e) => {
                setURL(e.currentTarget.value)
              }}
              disabled={status}
            />
          </div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <Button text="Cancel" variant="text" onClick={onClose} />
          <Button
            text="Upload"
            isLoading={status}
            disabled={status}
            onClick={onSubmit}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UploadLink
