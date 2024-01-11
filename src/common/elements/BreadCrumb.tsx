import { FC, Fragment } from 'react'
import { ChevronRight } from '@/common/components/Icons'
import { useRouter } from 'next/navigation'
import { classNames } from '../utils'

export interface ICrumb {
  text: string
  link: string
}

export interface IBreadCrumb {
  crumbs: ICrumb[]
}

interface CrumbProp {
  text: string
  isLast: boolean
  onClick: () => void
}

const Separator: FC = () => (
  <div className="mx-2 text-gray-300">
    <ChevronRight />
  </div>
)

const Crumb: FC<CrumbProp> = ({ text, isLast, onClick }) => (
  <Fragment>
    <div
      className={classNames('text-white text-sm cursor-pointer')}
      role="button"
      onClick={onClick}
    >
      {text}
    </div>
    {!isLast && <Separator />}
  </Fragment>
)

const BreadCrumb: FC<IBreadCrumb> = ({ crumbs }) => {
  const router = useRouter()

  return (
    <div className="flex items-center">
      {crumbs.map((crumb, index) => (
        <Crumb
          key={index}
          text={crumb.text}
          isLast={index === crumbs.length - 1}
          onClick={() => {
            if (!crumb.link) return
            router.push(crumb.link)
          }}
        />
      ))}
    </div>
  )
}

export default BreadCrumb
