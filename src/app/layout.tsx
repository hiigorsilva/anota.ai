import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin-ext'],
  display: 'swap',
  weight: ['400', '600', '700'],
  preload: true,
  style: 'normal',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Anota aí',
    default: 'Anota aí',
  },
  description: 'Sua maior parceira em produtividade',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
