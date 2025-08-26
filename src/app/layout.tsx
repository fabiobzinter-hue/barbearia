import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vince Barbearia - Dashboard',
  description: 'Dashboard completo para gestão da Vince Barbearia',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}