import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '@/api'
import FileUpload from '@/common/components/FileUpload'
import { Left } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import Input from '@/common/elements/Input'
import TabWidget from '@/common/elements/TabWidget'
import { usePopup } from '@/common/hooks/usePopup'
import { IDoc } from '@/interfaces'
import DocumentCard, {
  DocumentCardSkeleton,
} from '@/modules/agents/components/DocumentCard'
import { useNotifications } from '@/hooks/useNotifications'
import { useDocStore } from '@/common/stores/docStore'
import { useRouter } from 'next/router'

interface DocumentProps {
  docs: IDoc[]
  agentId: string
  onBack: (type: string) => void
  active: number
}

interface Props {
  docsList: IDoc[]
  agentId: string
}

interface FormType {
  url: string
}

const Document: FC<DocumentProps> = ({ agentId, docs, onBack, active }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-3">
        <div
          className="px-1 py-2 hover:cursor-pointer"
          onClick={() => onBack('')}
        >
          <Left />
        </div>
        <span className="text-base font-normal text-white">Documents</span>
      </div>
      <div className="mt-2">
        <TabWidget
          tabs={[
            {
              title: 'Files',
              content: <File docsList={docs} agentId={agentId} />,
            },
            {
              title: 'Link',
              content: <Link docsList={docs} agentId={agentId} />,
            },
          ]}
          activeTab={active}
        />
      </div>
    </div>
  )
}

const File: FC<Props> = ({ docsList }) => {
  const { query: queryParam } = useRouter()
  const { addNotification } = useNotifications()
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const [setDocs] = useDocStore((state) => [state.setDocs])
  const [docLists, setDocLists] = useState(docsList)

  const chatDocUpload = async (file: File) => {
    try {
      const response = await api.docs.chatDocUpload(queryParam.id?.toString() || "", file)
      if (Array.isArray(response)) {
        setDocLists((prevDocs) => [...prevDocs, ...response])
        setDocs([...docsList, ...response])
        addNotification({
          type: 'Success',
          text: 'Upload Doc Success',
        })
      } else {
        addNotification({
          type: 'Fail',
          text: 'Upload Doc Fail: Invalid response format',
        })
      }
    } catch (error) {
      addNotification({
        type: 'Fail',
        text: 'Upload Doc Fail',
      })
    }
  }

  const reupload = (docId: number) => {
    api.docs
      .deleteDoc(docId)
      .then(() => {
        addNotification({
          type: 'Success',
          text: 'Reupload Doc Success',
        })
      })
      .catch(() => {
        addNotification({
          type: 'Success',
          text: 'Reupload Doc Fail',
        })
      })
  }

  const deleteDoc = (docId: number) => {
    api.docs
      .deleteDoc(docId)
      .then(() => {
        setDocs(docsList.filter((doc) => doc.id !== docId))
        setDocLists(docLists.filter((doc) => doc.id !== docId))
        setIsConfirming(false)
        addNotification({
          type: 'Success',
          text: 'Delete Doc Success',
        })
      })
      .catch(() => {
        setIsConfirming(false)
        addNotification({
          type: 'Fail',
          text: 'Delete Doc Fail',
        })
      })
  }

  const confirmDelete = (docId: number) => {
    showConfirm({
      title: 'Delete this doc?',
      confirmText: 'Delete',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setIsConfirming(true)
        deleteDoc(docId)
        hideConfirm()
      },
    })
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-4">
        <FileUpload
          fileUpload={(file: File) => chatDocUpload(file)}
          mode="side"
        />
        <div className="flex flex-col gap-4">
          {docLists
            .filter((doc) => doc.type === 'file')
            .map((doc, index) => {
              return (
                <>
                  <DocumentCard
                    key={index}
                    data={doc}
                    onReupload={() => reupload(doc.id)}
                    onDelete={() => confirmDelete(doc.id)}
                  />
                </>
              )
            })}
        </div>
      </div>
    </div>
  )
}

const Link: FC<Props> = ({ docsList }) => {
  const { addNotification } = useNotifications()
  const [isUpLoading, setUpLoading] = useState(false)
  const [setDocs] = useDocStore((state) => [state.setDocs])
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const { register, handleSubmit, setValue, formState } = useForm<FormType>({
    mode: 'all',
  })
  const { errors } = formState
  const { query: queryParam } = useRouter()

  const onSubmit = (register: FormType) => {
    setUpLoading(true)
    api.docs
      .chatUrlUpload(queryParam.id?.toString() || "", register.url)
      .then((response) => {
        setDocs([...docsList, response])
        setUpLoading(false)
        addNotification({
          type: 'Success',
          text: 'Upload Url Success',
        })
      })
      .catch(() => {
        addNotification({
          type: 'Fail',
          text: 'Upload Url Fail',
        })
      })
    setValue('url', '')
  }

  const reupload = (docId: number) => {
    api.docs
      .deleteDoc(docId)
      .then(() => {
        addNotification({
          type: 'Success',
          text: 'Reupload Doc Success',
        })
      })
      .catch(() => {
        addNotification({
          type: 'Fail',
          text: 'Reupload Doc Fail',
        })
      })
  }

  const deleteDoc = (docId: number) => {
    api.docs
      .deleteDoc(docId)
      .then(() => {
        setDocs(docsList.filter((doc) => doc.id !== docId))
        setIsConfirming(false)
        addNotification({
          type: 'Success',
          text: 'Delete Doc Success',
        })
      })
      .catch(() => {
        setIsConfirming(false)
        addNotification({
          type: 'Fail',
          text: 'Delete Doc Fail',
        })
      })
  }

  const confirmDelete = (docId: number) => {
    showConfirm({
      title: 'Delete this doc?',
      confirmText: 'Delete',
      message: 'This action is permanent and cannot be undone.',
      onConfirm: () => {
        setIsConfirming(true)
        deleteDoc(docId)
        hideConfirm()
      },
    })
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('url', {
              required: 'Please enter valid url',
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: 'Please enter valid url',
              },
            })}
            type="text"
            placeholder="Enter a url"
            className="w-full"
          />
          {errors.url && (
            <div className="mt-2">
              <span className="text-sm text-red ">{errors.url.message}</span>
            </div>
          )}
          <div className="mt-4">
            <Button
              text="Submit"
              variant="gradient"
              type="submit"
              isLoading={isUpLoading}
            />
          </div>
        </form>
        {isUpLoading && <DocumentCardSkeleton />}
        <div className="flex flex-col gap-4">
          {docsList
            .filter((doc) => doc.type === 'url')
            .map((doc) => {
              return (
                <>
                  <DocumentCard
                    data={doc}
                    onReupload={() => reupload(doc.id)}
                    onDelete={() => confirmDelete(doc.id)}
                  />
                </>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Document
