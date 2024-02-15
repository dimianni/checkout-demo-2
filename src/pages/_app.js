import Layout from '@/UI/Layout/Layout'
import '@/styles/globals.css'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return(
    <>
      <Script strategy="beforeInteractive" src="https://cdn.checkout.com/js/framesv2.min.js" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
