import React from 'react'

import * as styles from './Display.module.css'

// eslint-disable-next-line react/prop-types
function Display({ text, crop, max }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.text}
        disabled
        value={text}
        // eslint-disable-next-line react/prop-types
        onChange={parseFloat(text).toFixed(max).length > max && crop(max)}
      />
    </div>
  )
}

export default Display
