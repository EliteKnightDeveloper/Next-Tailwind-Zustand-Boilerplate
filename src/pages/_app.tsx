import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'

import NotificationManager from '@/common/elements/NotificationManager'
import Layout from '@/common/layouts'
import '@/common/styles/global.css'
import PopupContainer from '@/common/layouts/PopupContainer'
import AuthContainer from '@/common/layouts/AuthContainer'
import { Fragment } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <title>ELITE</title>
        <link rel="shortcut icon" type="image/x-icon" href="/ELITE.ico" />
      </Head>
      <AuthContainer>
        <Layout>
          <PopupContainer>
            <NotificationManager>
              <Component {...pageProps} />
            </NotificationManager>
          </PopupContainer>
        </Layout>
      </AuthContainer>
    </Fragment>
  )
}

export default App
