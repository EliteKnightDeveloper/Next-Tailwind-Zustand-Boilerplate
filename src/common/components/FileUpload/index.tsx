import { FC, useEffect, useRef, useState } from 'react'
import Button from '@/common/elements/Button'
import { useNotifications } from '@/hooks/useNotifications'
import { Folder } from '../Icons'
import ProgressBar from '@/common/components/ProgressBar'

interface FileUploadProps {
  fileUpload: (file: File) => void
  mode: 'full' | 'side'
}

const fileTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
]

const FileUpload: FC<FileUploadProps> = ({ fileUpload, mode }) => {
  const [files, setFiles] = useState<any>([])
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef<any>(null)
  const { addNotification } = useNotifications()
  const [uploading, setUploading] = useState(false)
  const [active, setActive] = useState(0)
  const [fileProgress, setFileProgress] = useState<number[]>([])

  useEffect(() => {
    if (uploading) {
      let current_progress = 0
      const step = 0.7
      const interval = setInterval(() => {
        setFileProgress((prevProgress) => {
          current_progress += step
          const progress =
            Math.round(
              (Math.atan(current_progress) / (Math.PI / 2)) * 100 * 1000
            ) / 1000
          const cappedProgress = Math.min(progress, 100)

          const updatedProgress = [...prevProgress]
          updatedProgress[active] = cappedProgress
          if (updatedProgress.every((progress) => progress >= 100)) {
            clearInterval(interval)
          }

          return updatedProgress
        })
      }, 500)

      return () => {
        clearInterval(interval)
      }
    }
  }, [uploading, active])

  const handleSubmitFile = async () => {
    setUploading(true)
    setFileProgress([])

    for (let i = 0; i < files.length; i++) {
      setActive(i)

      setFileProgress((prevProgress) => {
        const updatedProgress = [...prevProgress]
        updatedProgress[i] = 0
        return updatedProgress
      })

      try {
        await fileUpload(files[i])
        setFileProgress((prevProgress) => {
          const updatedProgress = [...prevProgress]
          updatedProgress[i] = 100
          return updatedProgress
        })
      } catch (error) {
        console.error(`Error uploading file ${i + 1}:`, error)
      }

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
    setFiles([])
    setFileProgress([])
    document.getElementById('fileInput')?.setAttribute('type', 'text')
    document.getElementById('fileInput')?.setAttribute('type', 'file')
    setUploading(false)
  }

  const handleChange = (e: any) => {
    let isExtensionError = false
    const newFiles: number[] = []
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files['length']; i++) {
        if (fileTypes.indexOf(e.target.files[i].type) < 0) {
          isExtensionError = true
          continue
        }
        setFiles((prevState: any) => [...prevState, e.target.files[i]])
      }
      newFiles.push(0)
    }
    setFileProgress((prevProgress: any) => [...prevProgress, ...newFiles])

    isExtensionError &&
      addNotification({
        text: 'Please check file extension',
        type: 'Fail',
      })
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files['length']; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]])
      }
    }
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragEnter = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const removeFile = (idx: any) => {
    const newArr = [...files]
    newArr.splice(idx, 1)
    setFiles([])
    const newFiles: number[] = []
    newFiles.push(0)
    setFileProgress((prevProgress: any) => [...prevProgress, ...newFiles])
    setFiles(newArr)
  }

  return (
    <div
      className={`${
        dragActive ? 'bg-neon-100 opacity-70' : ''
      } w-full py-9 px-10 flex flex-col rounded-xl justify-center items-center gradient-box max-sm:px-3 max-sm:py-5`}
    >
      <form
        className="flex flex-col items-center w-full z-[10]"
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <Folder />
        <div className="flex flex-col items-center w-full gap-4">
          <div className="flex flex-col items-center relative">
            <input
              className="opacity-0 left-0 right-0 top-0 bottom-0 z-[1] absolute hover:cursor-pointer"
              type="file"
              multiple={true}
              onChange={handleChange}
              accept=".csv, .txt, .pdf, .xlsx"
              role="file"
              id="fileInput"
            />
            <span className="mt-4 text-sm font-medium text-white">
              Drop files here or click to select files
            </span>
            <span className="mt-4 text-sm font-normal text-gray-400">
              Supported file types: csv, text, pdf, xlsx
            </span>
          </div>
          {files.length > 0 && (
            <div className="flex flex-row items-center justify-between w-full gap-16 mt-4 max-xl:gap-4">
              <div className="flex flex-col justify-center w-full gap-4">
                {files.map((file: any, idx: number) => (
                  <FileBar
                    id={idx}
                    key={idx}
                    file={file}
                    percent={fileProgress[idx]}
                    uploading={uploading}
                    removeFile={removeFile}
                    mode={mode}
                  />
                ))}
              </div>
            </div>
          )}
          {files.length > 0 && (
            <Button
              text={'Upload'}
              variant={'gradient'}
              onClick={handleSubmitFile}
              isLoading={uploading}
            />
          )}
        </div>
      </form>
    </div>
  )
}

export default FileUpload

interface Props {
  id: number
  file: File
  percent: number
  removeFile: (id: number) => void
  uploading: boolean
  mode: 'full' | 'side'
}
export const FileBar: FC<Props> = ({
  id,
  file,
  percent,
  uploading,
  removeFile,
  mode = 'full',
}) => {
  return (
    <>
      {mode == 'full' && (
        <div className="flex flex-row items-center justify-between w-full gap-6 max-sm:items-start">
          <div className="flex flex-row items-center w-full gap-6 max-sm:flex-col max-sm:gap-4">
            <span className="text-sm font-semibold text-white 2xl:whitespace-pre w-[120px] overflow-hidden text-ellipsis">
              {file.name}
            </span>
            <div className="flex flex-1 max-sm:justify-start">
              <ProgressBar percent={percent} />
            </div>
          </div>
          {uploading && (
            <span className="text-sm font-medium text-gray-100 w-[60px]">
              {Number.isNaN(Math.ceil(percent)) ? '0' : Math.ceil(percent)}%
            </span>
          )}
          {!uploading && (
            <div className="flex flex-row items-center w-[60px]">
              <span
                className="text-sm font-medium text-gray-400 cursor-pointer"
                onClick={() => removeFile(id)}
              >
                Decline
              </span>
            </div>
          )}
        </div>
      )}
      {mode == 'side' && (
        <div className="flex flex-col items-center justify-between w-full gap-6">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="text-base font-semibold text-white">
              {file.name}
            </span>
            {uploading && (
              <span className="text-base font-medium text-gray-400">
                {Math.ceil(percent)}%
              </span>
            )}
            {!uploading && (
              <div className="flex flex-row items-center gap-4">
                <span
                  className="text-base font-medium text-gray-400 cursor-pointer max-sm:text-xs"
                  onClick={() => removeFile(id)}
                >
                  Decline
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center w-full">
            <ProgressBar percent={percent} />
          </div>
        </div>
      )}
    </>
  )
}
