import React from 'react'
import { Montserrat } from 'next/font/google'

// ------------------------------------------------------------

export const metadata = {
  title: 'Table | Students',
  description: 'Table Students',
}

// ------------------------------------------------------------

import './globals.scss'
import styles from './layout.module.scss'

// ------------------------------------------------------------

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={[`${montserrat.className}`].join(' ')}>
        <div className={styles.wrapper}>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
