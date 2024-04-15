import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'

import NotificationManager from '@/common/elements/NotificationManager'
import '@/common/styles/global.css'
import PopupContainer from '@/common/layouts/PopupContainer'
import AuthContainer from '@/common/layouts/AuthContainer'
import { Fragment } from 'react'
import APIContainer from '@/common/layouts/APIContainer'

import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('@/common/layouts'), {
  ssr: false,
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <title>Azara</title>
        <link rel="shortcut icon" type="image/x-icon" href="/Azara.ico" />
      </Head>
      <NotificationManager>
        <AuthContainer>
          <Layout>
            <APIContainer>
              <PopupContainer>
                <Component {...pageProps} />
              </PopupContainer>
            </APIContainer>
          </Layout>
        </AuthContainer>
      </NotificationManager>
    </Fragment>
  )
}

export default App
