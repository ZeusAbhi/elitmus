import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/authContext'
import Header from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <AuthProvider>
      <div className='min-h-screen isolate'>
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  </>
}
