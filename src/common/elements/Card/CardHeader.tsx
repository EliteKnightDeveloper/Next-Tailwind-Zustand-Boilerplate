import React, { FC, HtmlHTMLAttributes, Fragment } from 'react'
import { classNames } from '@/common/utils'

interface CardHeaderProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactElement | React.ReactElement[] | string
}

const CardHeader: FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <Fragment>
      <div
        className={classNames(
          'flex flex-row items-center text-white',
          className ? className : ''
        )}
      >
        {children}
      </div>
    </Fragment>
  )
}

export default CardHeader
