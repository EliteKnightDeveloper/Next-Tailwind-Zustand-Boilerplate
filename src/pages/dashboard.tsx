import { NextPage } from 'next'
import PageHeader from '@/common/layouts/PageHeader'
import Dashboard from '@/modules/dashboard'
import BreadCrumb from '@/common/elements/BreadCrumb'
import { appLinks } from '@/common/utils/constants'
import PageContent from '@/common/layouts/PageContent'
import { Fragment } from 'react'

const DashboardPage: NextPage = () => (
  <Fragment>
    <PageHeader className="flex flex-row justify-between">
      <BreadCrumb
        crumbs={[
          {
            text: 'Dashboard',
            link: appLinks.dashboard,
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <Dashboard />
    </PageContent>
  </Fragment>
)

export default DashboardPage
