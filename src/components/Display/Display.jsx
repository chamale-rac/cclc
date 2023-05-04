import React from 'react'

import * as styles from './Display.module.css'

// eslint-disable-next-line react/prop-types
function Display({ text }) {
  return (
    <div className={styles.container}>
      <input className={styles.text} disabled value={text} />
    </div>
  )
}

export default Display
