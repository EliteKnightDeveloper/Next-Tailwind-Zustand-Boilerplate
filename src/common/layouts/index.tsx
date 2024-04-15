import { Fragment, ReactNode } from 'react'

import Sidebar from './Sidebar'
import { useThemeStore } from '../stores/themeStore'
import { classNames } from '../utils'
import { useGlobalStore } from '../stores/globalStore'
import { useRouter } from 'next/router'
import { appLinks } from '../utils/constants'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarCollapsed] = useThemeStore((state) => [
    state.isSidebarCollapsed,
  ])
  const [isPageLoading, isSignedIn] = useGlobalStore((state) => [
    state.isPageLoading,
    state.isSignedIn,
  ])
  const router = useRouter()
  const isInviteLink = router.pathname.indexOf(appLinks.signup) !== -1

  return isInviteLink ? (
    children
  ) : (
    <Fragment>
      {/* {isSignedIn && <Sidebar />} */}
      <Sidebar />
      {/* <main
        className={classNames(
          isSignedIn
            ? isSidebarCollapsed
              ? 'sm:ml-[80px]'
              : 'sm:ml-[285px]'
            : '',
          'transition-all relative overflow-x-clip overflow-y-clip max-sm:pt-[75px] max-sm:h-screen max-sm:flex max-sm:flex-col'
        )}
      > */}
      <main
        className={classNames(
          isSidebarCollapsed ? 'sm:ml-[80px]' : 'sm:ml-[285px]',
          'transition-all relative overflow-x-clip overflow-y-clip max-sm:pt-[75px] max-sm:h-screen max-sm:flex max-sm:flex-col'
        )}
      >
        {/* {isSignedIn && ( */}
        <>
          <div className="top-effect" />
          <div className="left-effect" />
          <div className="right-effect" />
        </>
        {/* )} */}
        {isPageLoading ? <div className="h-screen"></div> : children}
      </main>
    </Fragment>
  )
}

export default Layout
