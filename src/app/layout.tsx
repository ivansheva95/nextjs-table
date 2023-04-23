import React from 'react'

// ------------------------------------------------------------

export const metadata = {
  title: 'Table | Students',
  description: 'Table Students',
}

// ------------------------------------------------------------

import './globals.scss'
import styles from './layout.module.scss'

// ------------------------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
