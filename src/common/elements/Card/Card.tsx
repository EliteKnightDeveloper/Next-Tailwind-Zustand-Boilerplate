import React, { FC, HtmlHTMLAttributes, Fragment } from 'react'
import { classNames } from '@/common/utils'

interface CardProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactElement | React.ReactElement[] | string
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <Fragment>
      <div
        className={classNames(
          'flex flex-col justify-start p-4 form-container rounded-xl bg-black w-full',
          className ? className : ''
        )}
      >
        {children}
      </div>
    </Fragment>
  )
}

export default Card
