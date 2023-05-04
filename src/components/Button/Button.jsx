import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import * as styles from './Button.module.css'

function Button({ customKey, value, type, action }) {
  const [pressed, setPressed] = useState(false)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === customKey) {
        action(value)
        setPressed(true)
        setTimeout(() => {
          setPressed(false)
        }, 200)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [customKey, value, action])

  return (
    <button
      type="button"
      key={value}
      className={`
      ${styles.key} ${pressed ? styles.pressed : ''}
      ${styles[type]} 
      ${value === '0' ? styles.zero : ''}
      `}
      onClick={() => action(value)}
    >
      {value}
    </button>
  )
}

Button.propTypes = {
  customKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export default Button
