import { NextPage } from 'next'
import PageHeader from '@/common/layouts/PageHeader'
import Workflows from '@/modules/workflows/index'
import BreadCrumb from '@/common/elements/BreadCrumb'
import { appLinks } from '@/common/utils/constants'
import PageContent from '@/common/layouts/PageContent'
import { Fragment } from 'react'

const WorkflowPage: NextPage = () => (
  <Fragment>
    <PageHeader className="flex flex-row justify-between">
      <BreadCrumb
        crumbs={[
          {
            text: 'Workflow',
            link: appLinks.workflows,
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <Workflows />
    </PageContent>
  </Fragment>
)

export default WorkflowPage
