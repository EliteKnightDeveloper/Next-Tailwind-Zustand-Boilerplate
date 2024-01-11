import { FC, ReactNode } from 'react'

interface PageContentProps {
  children: ReactNode
}

const PageContent: FC<PageContentProps> = ({ children }) => (
  <div className="sm:min-h-[calc(100vh-3.3rem)] max-sm:flex-1 max-sm:overflow-y-scroll scrollbar-hide">
    {children}
  </div>
)

export default PageContent
