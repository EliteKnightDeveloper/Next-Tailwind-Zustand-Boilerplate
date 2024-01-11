import { FC, Fragment } from 'react'
import PageHeader from '@/common/layouts/PageHeader'
import CreateAgent from '@/modules/agents/components/Create'
import BreadCrumb from '@/common/elements/BreadCrumb'
import { appLinks } from '@/common/utils/constants'
import PageContent from '@/common/layouts/PageContent'

const AgentsCreatePage: FC = () => (
  <Fragment>
    <PageHeader>
      <BreadCrumb
        crumbs={[
          {
            text: 'Agents',
            link: appLinks.agents,
          },
          {
            text: 'Create Agent',
            link: appLinks.create,
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <CreateAgent />
    </PageContent>
  </Fragment>
)

export default AgentsCreatePage
