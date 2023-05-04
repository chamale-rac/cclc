import React, { useState } from 'react'
import { Keyboard, Display } from '@components'
import * as styles from './Calculator.module.css'

function Calculator() {
  const [value, setValue] = useState(-100)
  const [stockValues, setStockValue] = useState([]) // [{value: 100, operator: '+'}, {value: 200, operator: '-'}]
  const [previous, setPrevious] = useState(null)

  const clearCalculator = () => {
    setValue(0)
    setStockValue([])
  }
  const toggleSign = () => setValue((prevValue) => -prevValue)

  const handleOperator = (operator) => {
    stockValues.push({ num: value, operator })
    setPrevious('operator')
  }

  const handleEqual = (operator) => {
    handleOperator(operator)

    const equal = stockValues
      .slice(1)
      .reduce((accumulator, currentValue, index) => {
        const { num } = currentValue
        const { operator: lastOperator } = stockValues[index]
        if (lastOperator === '+') {
          return accumulator + parseFloat(num)
        }
        return accumulator
      }, parseFloat(stockValues[0].num))

    setValue(equal)
  }

  const inputDecimal = () =>
    !value.includes('.') && setValue((prevValue) => `${prevValue}.`)

  // LOL it's a joke, cuase the number is a string then it is just appended. ✨ Perfect.
  const inputDigit = (number) =>
    value === 0 || previous === 'operator' || number === '0'
      ? (setValue(number), setPrevious(null))
      : setValue((prevValue) => prevValue + number)

  const keys = [
    { value: 'C', type: '_function', action: clearCalculator },
    { value: '+/-', type: '_function', action: toggleSign },
    { value: '%', type: '_function', action: handleOperator }, // This is not percent, is module XD
    { value: '/', type: 'operator', action: handleOperator },

    { value: '7', type: 'digit', action: inputDigit },
    { value: '8', type: 'digit', action: inputDigit },
    { value: '9', type: 'digit', action: inputDigit },
    { value: '*', type: 'operator', action: handleOperator },

    { value: '4', type: 'digit', action: inputDigit },
    { value: '5', type: 'digit', action: inputDigit },
    { value: '6', type: 'digit', action: inputDigit },
    { value: '-', type: 'operator', action: handleOperator },

    { value: '1', type: 'digit', action: inputDigit },
    { value: '2', type: 'digit', action: inputDigit },
    { value: '3', type: 'digit', action: inputDigit },
    { value: '+', type: 'operator', action: handleOperator },

    { value: '0', type: 'digit', action: inputDigit },
    { value: '.', type: 'decimal', action: inputDecimal },
    { value: '=', type: 'operator', action: handleEqual },
  ]

  return (
    <div className={styles.container}>
      <Display text={value} />
      <Keyboard keys={keys} />
    </div>
  )
}

export default Calculator
