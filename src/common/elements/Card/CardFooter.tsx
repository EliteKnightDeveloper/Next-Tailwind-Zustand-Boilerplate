import React, { FC, HtmlHTMLAttributes, Fragment } from 'react'
import { classNames } from '@/common/utils'

interface CardFooterProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactElement | React.ReactElement[] | string
  isToggle?: boolean
}

const CardFooter: FC<CardFooterProps> = ({ children, isToggle, className }) => {
  return (
    <Fragment>
      <div
        className={classNames(
          'flex flex-row items-center justify-between mt-2 pt-2 border-t border-gray-500',
          className ? className : ''
        )}
      >
        {children}
      </div>
    </Fragment>
  )
}

export default CardFooter
