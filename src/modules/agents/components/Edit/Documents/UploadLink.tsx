import { FC, useEffect, useState } from 'react'
import { Cross } from '@/common/components/Icons'
import Modal, { ModalProps } from '@/common/elements/Modal'
import Input from '@/common/elements/Input'
import Button from '@/common/elements/Button'
import ProgressBar from '@/common/components/ProgressBar'

function isValidURL(url: string) {
  var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
  return urlRegex.test(url)
}

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
  const [url, setURL] = useState('https://')
  const [isValid, setValid] = useState(true)
  const [fileProgress, setFileProgress] = useState<number>(0)

  useEffect(() => {
    if (status) {
      let current_progress = 0
      const step = 0.7
      const interval = setInterval(() => {
        setFileProgress((_) => {
          current_progress += step
          const progress =
            Math.round(
              (Math.atan(current_progress) / (Math.PI / 2)) * 100 * 1000
            ) / 1000
          return Math.min(progress, 100)
        })
      }, 500)

      return () => {
        clearInterval(interval)
      }
    } else {
      setFileProgress(0)
    }
  }, [status])

  const onSubmit = () => {
    if (!url) return
    setFileProgress(1)
    upload(url)
  }

  const onURLBlur = () => {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      setURL(`https://${url}`)
    }
  }

  useEffect(() => {
    setValid(isValidURL(url))
  }, [url])

  useEffect(() => {
    if (isOpen) setURL('https://')
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
            <Input
              type="url"
              placeholder="Enter the url"
              className="w-full"
              value={url}
              onBlur={onURLBlur}
              onChange={(e) => {
                setURL(e.currentTarget.value)
              }}
              onPaste={(e) => {
                const pastedText = e.clipboardData.getData('text')
                if (
                  pastedText.startsWith('https://') ||
                  pastedText.startsWith('http://')
                ) {
                  setURL(pastedText)
                } else {
                  setURL('https://' + pastedText)
                }
                e.preventDefault()
              }}
              disabled={status}
              role="Upload Link"
            />
          </div>
          <div>
            {!isValid && (
              <h3 className="text-rose-600 font-semibold text-sm">
                Please type valid url.
              </h3>
            )}
          </div>
          {fileProgress !== 0 && (
            <div>
              <ProgressBar percent={fileProgress} />
            </div>
          )}
        </div>
        <div className="flex justify-between w-full mt-4">
          <Button text="Cancel" variant="text" onClick={onClose} />
          <Button
            text="Upload"
            isLoading={status}
            disabled={status || !isValid}
            onClick={onSubmit}
            role="Upload Link Doc"
          />
        </div>
      </div>
    </Modal>
  )
}

export default UploadLink
