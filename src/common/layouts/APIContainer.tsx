import { useAgents } from '@/hooks/useAgents'
import { FC, ReactNode, Fragment } from 'react'

interface PopupContainerProps {
  children: ReactNode
}

const APIContainer: FC<PopupContainerProps> = ({ children }) => {
  useAgents()

  return <Fragment>{children}</Fragment>
}

export default APIContainer
