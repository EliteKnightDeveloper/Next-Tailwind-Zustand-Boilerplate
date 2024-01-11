import { FC } from 'react'
import Image from 'next/image'
import { GradientCircleCheck, Spinner } from '@/common/components/Icons'
import Card from '@/common/elements/Card/Card'
import CardHeader from '@/common/elements/Card/CardHeader'
import CardBody from '@/common/elements/Card/CardBody'
import CardFooter from '@/common/elements/Card/CardFooter'
import Toggle from '@/common/elements/Toggle'

interface IntegrationCardProps {
  name: string
  src: string
  description: string
  active?: boolean
  onToggle?: () => void
  loading?: boolean
}

const IntegrationCard: FC<IntegrationCardProps> = ({
  active = false,
  name,
  description,
  src,
  onToggle,
  loading = false,
}) => {
  return (
    <Card className={`${!active ? 'opacity-50' : 'w-full'}`}>
      <CardHeader className="gap-3">
        <Image src={src} alt={''} />
        <span className="text-sm font-semibold">{name}</span>
      </CardHeader>
      <CardBody>
        <span className="z-10 text-sm font-normal document-body">
          {description}
        </span>
      </CardBody>
      <CardFooter>
        <div className="flex items-center justify-start w-full gap-2">
          {loading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : (
            <GradientCircleCheck />
          )}
        </div>
        <Toggle
          checked={active}
          onToggle={onToggle!}
          role={name}
        />
      </CardFooter>
    </Card>
  )
}

export default IntegrationCard
