import React from 'react'

// ----------------------------------------------------------------------

import styles from './button.module.scss'

// ----------------------------------------------------------------------

type ButtonProps = {
  children: React.ReactNode,
  disabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

// ----------------------------------------------------------------------

export default function Button({ children, disabled, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props} disabled={disabled}>
      {children}
    </button>
  )
}
