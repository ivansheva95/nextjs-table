import React from 'react'

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
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
