import { NextPage } from 'next'
import PageHeader from '@/common/layouts/PageHeader'
import BreadCrumb from '@/common/elements/BreadCrumb'
import PageContent from '@/common/layouts/PageContent'
import { Fragment } from 'react'
import EditWorkFlow from '@/modules/workflows/Edit'

const EditWorkflowPage: NextPage = () => (
  <Fragment>
    <PageHeader className="flex flex-row justify-between">
      <BreadCrumb
        crumbs={[
          {
            text: 'Workflow',
            link: '/workflows',
          },
          {
            text: 'Workflow Detail',
            link: '',
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <EditWorkFlow />
    </PageContent>
  </Fragment>
)

export default EditWorkflowPage
