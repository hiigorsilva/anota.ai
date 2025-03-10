import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/footer'
import { RootProviders } from '@/providers'

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-dvh w-full flex flex-col antialiased`}
      >
        <RootProviders>
          <div className="flex flex-col flex-1 h-full w-full">{children}</div>
          <Footer />
        </RootProviders>
      </body>
    </html>
  )
}
