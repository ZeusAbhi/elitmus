import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/authContext'
import Header from '@/components/Header'
import NextProgress from 'next-progress'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function App({ Component, pageProps }: AppProps) {
  const [parentRef, _] = useAutoAnimate()
  return <>
    <AuthProvider>
      <div className='min-h-screen isolate' ref={parentRef}>
        <NextProgress height={6} color='#581c87 ' />
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  </>
}
