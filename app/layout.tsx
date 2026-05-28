import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sanli — Frontend Engineer & Builder',
  description: '前端工程师，在字节搬砖，偷偷造东西。',
  openGraph: {
    title: 'Sanli — Frontend Engineer & Builder',
    description: '前端工程师，在字节搬砖，偷偷造东西。',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
