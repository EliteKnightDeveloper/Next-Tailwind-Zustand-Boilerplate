import { FC, Fragment } from 'react'
import PageHeader from '@/common/layouts/PageHeader'
import Agents from '@/modules/agents'
import BreadCrumb from '@/common/elements/BreadCrumb'
import { appLinks } from '@/common/utils/constants'
import PageContent from '@/common/layouts/PageContent'

const AgentsPage: FC = () => (
  <Fragment>
    <PageHeader>
      <BreadCrumb
        crumbs={[
          {
            text: 'Agents',
            link: appLinks.agents,
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <Agents />
    </PageContent>
  </Fragment>
)

export default AgentsPage
