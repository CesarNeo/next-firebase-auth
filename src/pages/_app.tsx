import '@/styles/globals.css'
import initAuth from '@/utils/initAuth'
import type { AppProps } from 'next/app'

initAuth()

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
