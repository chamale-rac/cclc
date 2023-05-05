import React, { useState, useEffect } from 'react'
import { Keyboard, Display } from '@components'
import * as styles from './CalculatorLogic.module.css'

function CalculatorLogic() {
  const max = 9

  const [error, setError] = useState(false)
  const [value, setValue] = useState('0')
  const [stockValues, setStockValues] = useState([]) // [{value: 100, operator: '+'}, {value: 200, operator: '-'}]
  const [previous, setPrevious] = useState(null)

  // Function to crop the value to just 9 characters
  const handleCrop = (crop) =>
    setValue((prevValue) => prevValue.toString().slice(0, crop))

  const clearCalculator = () => {
    setValue('0')
    setStockValues([])
  }
  const toggleSign = () => {
    setValue((prevValue) => -prevValue)
  }

  const handleOperator = (operator) => {
    stockValues.push({ num: value, operator })
    setPrevious('operator')
  }

  const handleEqual = (operator) => {
    handleOperator(operator)
    setPrevious(null)

    const equal = stockValues
      .slice(1)
      .reduce((accumulator, currentValue, index) => {
        const { num } = currentValue
        const { operator: lastOperator } = stockValues[index]
        if (lastOperator === '+') {
          return accumulator + parseFloat(num)
        }
        if (lastOperator === '-') {
          return accumulator - parseFloat(num)
        }
        if (lastOperator === '*') {
          return accumulator * parseFloat(num)
        }
        if (lastOperator === '/') {
          return accumulator / parseFloat(num)
        }
        if (lastOperator === '%') {
          return accumulator % parseFloat(num)
        }
        return accumulator
      }, parseFloat(stockValues[0].num))

    setStockValues([])
    setValue(equal)
  }

  const inputDecimal = () =>
    !value.toString().includes('.') && setValue((prevValue) => `${prevValue}.`)

  // LOL it's a joke, cuase the number is a string then it is just appended. ✨ Perfect.
  const inputDigit = (number) =>
    value === '0' || previous === 'operator'
      ? (setValue(number), setPrevious(null))
      : setValue((prevValue) => prevValue + number)

  const keys = [
    { value: 'C', type: '_function', action: clearCalculator, key: 'c' },
    { value: '+/-', type: '_function', action: toggleSign, key: 't' },
    { value: '%', type: '_function', action: handleOperator, key: 'm' },
    { value: '/', type: 'operator', action: handleOperator, key: '/' },

    { value: '7', type: 'digit', action: inputDigit, key: '7' },
    { value: '8', type: 'digit', action: inputDigit, key: '8' },
    { value: '9', type: 'digit', action: inputDigit, key: '9' },
    { value: '*', type: 'operator', action: handleOperator, key: '*' },

    { value: '4', type: 'digit', action: inputDigit, key: '4' },
    { value: '5', type: 'digit', action: inputDigit, key: '5' },
    { value: '6', type: 'digit', action: inputDigit, key: '6' },
    { value: '-', type: 'operator', action: handleOperator, key: '-' },

    { value: '1', type: 'digit', action: inputDigit, key: '1' },
    { value: '2', type: 'digit', action: inputDigit, key: '2' },
    { value: '3', type: 'digit', action: inputDigit, key: '3' },
    { value: '+', type: 'operator', action: handleOperator, key: '+' },

    { value: '0', type: 'digit', action: inputDigit, key: '0' },
    { value: '.', type: 'decimal', action: inputDecimal, key: '.' },
    { value: '=', type: 'operator', action: handleEqual, key: 'Enter' },
  ]

  useEffect(() => {
    if (value.toString().length >= max) {
      setError('9 max')
    } else if (
      value.toString().includes('Infinity') ||
      value.toString().includes('NaN')
    ) {
      setError('Oops!')
    } else {
      setError(false)
    }
  }, [value])

  return (
    <div className={styles.container}>
      <Display text={value} crop={handleCrop} max={max} error={error} />
      <Keyboard keys={keys} />
    </div>
  )
}

export default CalculatorLogic
