import React from 'react'

import * as styles from './Display.module.css'

// eslint-disable-next-line react/prop-types
function Display({ text, crop, max, error }) {
  return (
    <div className={styles.container}>
      <div className={styles.alerts}>
        {!error && 'All-right'} {error && error}
      </div>
      <textarea
        className={styles.text}
        disabled
        value={text}
        // I know this can generate a warning, but I prefer this way cause it's easier in this case,
        // otherwise I would have to create a new function to handle this and check on every change.
        // I have tried using useEffect, but it was not working as expected.
        // Cause the validation happens after the change. So it look glitchy in the display.
        onChange={text.toString().length > max ? crop(max) : undefined}
      />
    </div>
  )
}

export default Display
