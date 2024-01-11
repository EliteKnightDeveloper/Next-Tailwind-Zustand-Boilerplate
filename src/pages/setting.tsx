import { NextPage } from 'next'

import BreadCrumb from '@/common/elements/BreadCrumb'
import PageContent from '@/common/layouts/PageContent'
import PageHeader from '@/common/layouts/PageHeader'
import Setting from '@/modules/setting'
import { appLinks } from '@/common/utils/constants'
import { Fragment } from 'react'

const SettingPage: NextPage = () => (
  <Fragment>
    <PageHeader>
      <BreadCrumb
        crumbs={[
          {
            text: 'Setting',
            link: appLinks.setting,
          },
        ]}
      />
    </PageHeader>
    <PageContent>
      <Setting />
    </PageContent>
  </Fragment>
)

export default SettingPage
