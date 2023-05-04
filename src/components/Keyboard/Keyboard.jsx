import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@components'

import * as styles from './Keyboard.module.css'

function Keyboard({ keys }) {
  return (
    <div className={styles.container}>
      {keys.map((key) => {
        return (
          <Button
            key={key.value}
            value={key.value}
            type={key.type}
            action={key.action}
          />
        )
      })}
    </div>
  )
}

Keyboard.propTypes = {
  keys: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    }),
  ).isRequired,
}

export default Keyboard
