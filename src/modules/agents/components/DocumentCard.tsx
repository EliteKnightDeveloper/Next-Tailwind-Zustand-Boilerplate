import { FC } from 'react'
import { Link, Spread, Folder } from '@/common/components/Icons'
import Card from '@/common/elements/Card/Card'
import CardHeader from '@/common/elements/Card/CardHeader'
import CardBody from '@/common/elements/Card/CardBody'
import { IDoc } from '@/interfaces'
import Skeleton from '@/common/elements/Skeleton'
import DropdownMenu from '@/common/components/DropdownMenu'

interface DocumentCardProps {
  data: IDoc
  onDelete: (docId: number) => void
  onReupload: (docId: number) => void
}

export const DocumentCardSkeleton: FC = () => (
  <Card>
    <CardHeader>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-[20px]">
            <Skeleton variant="text" />
          </div>
          <div className="w-[150px]">
            <Skeleton variant="text" />
          </div>
        </div>
      </div>
    </CardHeader>
    <CardBody>
      <div className="w-[200px]">
        <Skeleton variant="text" lines={4} />
      </div>
      <div className="w-[150px] mt-2">
        <Skeleton variant="text" />
      </div>
    </CardBody>
  </Card>
)

const DocumentCard: FC<DocumentCardProps> = ({
  data,
  onDelete,
  onReupload,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {data.type === 'file' && (
              <div className=" w-max">
                <Folder />
              </div>
            )}
            {data.type === 'url' && (
              <div className=" w-max">
                <Link />
              </div>
            )}
            <span className="text-sm font-semibold text-gray-100 break-all overflow-ellipsis document-title">
              {data.filename}
            </span>
          </div>
          <DropdownMenu
            align="right"
            options={[
              {
                title: 'Remove',
                action: () => onDelete(data.id),
                color: 'text-red',
              },
            ]}
            icon={<Spread />}
          />
        </div>
      </CardHeader>
      <CardBody>
        <span className="text-sm font-normal document-body">
          {data.summary}
        </span>
        <span className="mt-2 text-xs font-normal text-gray-400 break-all">
          {data.filename}
        </span>
      </CardBody>
    </Card>
  )
}

export default DocumentCard
