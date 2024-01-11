import { FC, Fragment, useEffect, useState } from 'react'
import { Link } from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import DocumentCard, { DocumentCardSkeleton } from '../../DocumentCard'
import UploadLink from './UploadLink'
import FileUpload from '@/common/components/FileUpload'
import api from '@/api'
import { IDoc } from '@/interfaces'
import { useRouter } from 'next/router'
import { usePopup } from '@/common/hooks/usePopup'
import Loading from '@/common/components/Loading'
import { useNotifications } from '@/hooks/useNotifications'

const DocumentsSkeleton: FC = () => {
  const skeletons = []

  for (let i = 0; i < 4; ++i) {
    skeletons.push(<DocumentCardSkeleton key={i} />)
  }
  return skeletons
}

const Documents: FC = () => {
  const router = useRouter()
  const { query } = router
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const [isUploadOpen, setUploadOpen] = useState(false)
  const [docs, setDocs] = useState<IDoc[]>([])
  const [isLoading, setLoading] = useState(true)
  const [urlUploading, setUrlUploading] = useState(false)
  const { addNotification } = useNotifications()

  useEffect(
    () => {
      api.docs
        .getDocsByAgent(query.id!.toString())
        .then((response) => {
          setDocs(response)
          setLoading(false)
        })
        .catch(() => {})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const deleteDoc = (docId: number) => {
    api.docs
      .deleteDoc(docId)
      .then(() => {
        setDocs(docs.filter((doc) => doc.id !== docId))
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

  const uploadLink = (url: string) => {
    setUrlUploading(true)
    api.docs
      .agentUrlUpload(query.id!.toString(), url)
      .then((response) => {
        setUrlUploading(false)
        setDocs([...docs, response])
        addNotification({
          type: 'Success',
          text: 'Upload Link Success',
        })
        setUploadOpen(!isUploadOpen)
      })
      .catch(() => {
        addNotification({
          type: 'Fail',
          text: 'Upload Link Fail',
        })
        setUploadOpen(!isUploadOpen)
      })
  }

  const agentDocUpload = async (file: File) => {
    try {
      const response = await api.docs.agentDocUpload(query.id!.toString(), file)
      if (Array.isArray(response)) {
        setDocs((prevDocs) => [...prevDocs, ...response])
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

  return (
    <Fragment>
      <div className="mt-4">
        <span className="text-sm font-medium text-white">
          Train your Agent with customizable data.
        </span>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <Link />
            <span className="text-sm font-medium text-white">
              Upload any documents and add URLs
            </span>
          </div>
          <div className="w-max">
            <Button
              text="Add URL"
              onClick={() => {
                setUploadOpen(true)
              }}
              className="w-max"
            />
          </div>
        </div>
        <div className="mt-6">
          <FileUpload
            fileUpload={(file: File) => agentDocUpload(file)}
            mode="full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 max-2xl:grid-cols-1">
          {docs.map((doc) => {
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
          {isLoading && <DocumentsSkeleton />}
        </div>
        <UploadLink
          isOpen={isUploadOpen}
          onClose={() => {
            setUploadOpen(false)
          }}
          upload={uploadLink}
          status={urlUploading}
        />
      </div>
      {isLoading && (
        <div className="absolute -top-[calc(0%)] bottom-0 left-0 right-0 z-10 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </Fragment>
  )
}

export default Documents
