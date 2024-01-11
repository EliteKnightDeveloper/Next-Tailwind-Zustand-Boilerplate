import { NextPage } from 'next'
import PageHeader from '@/common/layouts/PageHeader'
import BreadCrumb from '@/common/elements/BreadCrumb'
import PageContent from '@/common/layouts/PageContent'
import { Fragment } from 'react'
import CreateWorkFlow from '@/modules/workflows/Create'

const CreateWorkflowPage: NextPage = () => (
  <Fragment>
    <PageHeader className="flex flex-row justify-between">
      <BreadCrumb
        crumbs={[
          {
            text: 'Workflow',
            link: '/workflows',
          },
          {
            text: 'Create',
            link: '',
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <CreateWorkFlow />
    </PageContent>
  </Fragment>
)

export default CreateWorkflowPage
