import { FC, HtmlHTMLAttributes } from 'react'
import { classNames } from '@/common/utils'

interface Props extends HtmlHTMLAttributes<HTMLAnchorElement> {}

const Loading: FC<Props> = ({ className }) => (
  <div className={classNames('loading-content', className ? className : '')}>
    <div className="element">
      <span></span>
    </div>
    <div className="element">
      <span></span>
    </div>
    <div className="element">
      <span></span>
    </div>
    <div className="element">
      <span></span>
    </div>
    <div className="element">
      <span></span>
    </div>
    <div className="element">
      <span></span>
    </div>
  </div>
)

export default Loading
