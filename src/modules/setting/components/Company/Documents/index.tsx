import { FC, useEffect, useState } from 'react'
import FileUpload from '@/common/components/FileUpload'
import { Spread, GradientFolder } from '@/common/components/Icons'
import { usePopup } from '@/common/hooks/usePopup'
import api from '@/api'
import { IDoc } from '@/interfaces'
import { useNotifications } from '@/hooks/useNotifications'
import DropdownMenu from '@/common/components/DropdownMenu'
import { useUserStore } from '@/common/stores/userStore'

const Documents: FC = () => {
  const { addNotification } = useNotifications()
  const { showConfirm, hideConfirm, setIsConfirming } = usePopup()
  const [docs, setDocs] = useState<IDoc[]>([])
  const [isUploading, setUploading] = useState(false)
  const user = useUserStore((state) => state.user)

  useEffect(
    () => {
      api.docs
        .getDocsByCompany(user!.id.toString())
        .then((response) => {
          if (response.length) setDocs(response)
          else setDocs([])
        })
        .catch(() => {})
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const deleteDoc = (docId: number) => {
    // api.docs
    //   .deleteDoc(docId)
    //   .then(() => {
    //     setDocs(docs.filter((doc) => doc.id !== docId))
    //     setIsConfirming(false)
    //     addNotification({
    //       type: 'Success',
    //       text: 'Delete Doc Success',
    //     })
    //   })
    //   .catch(() => {
    //     setIsConfirming(false)
    //     addNotification({
    //       type: 'Fail',
    //       text: 'Delete Doc Fail',
    //     })
    //   })
  }

  const reUpload = (docId: number) => {
    // api.docs
    //   .deleteDoc(docId)
    //   .then(() => {
    //     addNotification({
    //       type: 'Success',
    //       text: 'Reupload Doc Success',
    //     })
    //   })
    //   .catch(() => {
    //     addNotification({
    //       type: 'Fail',
    //       text: 'Reupload Doc Success',
    //     })
    //   })
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

  const companyDocUpload = (file: File) => {
    setUploading(true)
    // api.docs
    //   .companyDocUpload(query.id!.toString(), file)
    //   .then((response) => {
    //     setUploading(false)
    //     setDocs([...docs, ...response])
    //     addNotification({
    //       type: 'Success',
    //       text: 'Upload Doc Success',
    //     })
    //   })
    //   .catch((error) => {
    //     setUploading(false)
    //     addNotification({
    //       type: 'Fail',
    //       text: 'Upload Doc Fail',
    //     })
    //   })
  }

  return (
    <div className="flex">
      <div className="flex flex-col w-full gap-6">
        <span className="text-sm font-medium text-gray-100">
          Financial, Legal, Documents, Materials, News, and Updates
        </span>
        <div className="flex flex-col w-full gap-4 xl:mt-3">
          <FileUpload
            fileUpload={(file) => companyDocUpload(file)}
            mode="full"
          />
          <div className="relative flex flex-col w-full p-4 bg-black rounded-xl form-container">
            <div className="flex items-end justify-between pb-2 border-b border-b-gray-500">
              <span className="text-base font-semibold text-gray-100">
                Documents
              </span>
              <span className="text-xs font-normal text-gray-400">
                {docs.length} items
              </span>
            </div>
            <div className="flex mt-2">
              <div className="flex flex-col w-full gap-2">
                {docs.map((doc, i) => {
                  return (
                    <div key={i} className="flex flex-row justify-between">
                      <div className="flex flex-row items-center gap-3">
                        <GradientFolder />
                        <span className="text-sm font-medium text-[#D6DAE1]">
                          {doc.filename}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <DropdownMenu
                          align="right"
                          options={
                            [
                              // {
                              //   title: 'Reupload',
                              //   action: () => reUpload(doc.id),
                              // },
                              // {
                              //   title: 'Remove',
                              //   action: () => confirmDelete(doc.id),
                              //   color: 'text-red',
                              // },
                            ]
                          }
                          icon={<Spread />}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documents
