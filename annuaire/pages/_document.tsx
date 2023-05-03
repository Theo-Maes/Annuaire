import { Header } from '@/components/Header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body className="bg-base-100">
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
