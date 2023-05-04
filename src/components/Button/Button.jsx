import React from 'react'
import PropTypes from 'prop-types'

import * as styles from './Button.module.css'

function Button({ value, type, action }) {
  return (
    <button
      type="button"
      key={value}
      className={`${styles.key} ${styles[type]} ${
        value === '0' ? styles.zero : ''
      }`}
      onClick={() => action(value)}
    >
      {value}
    </button>
  )
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export default Button
