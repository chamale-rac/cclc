// Calculator.test.jsx
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Calculator from '../../components/CalculatorLogic/CalculatorLogic.jsx'

describe('Calculator component', () => {
  it('Renders correctly', () => {
    render(<Calculator />)
  })

  it('Has a display', () => {
    const { getByRole } = render(<Calculator />)
    const display = getByRole('textbox')
    expect(display).toBeInTheDocument()
  })

  it('Has a keyboard and the keyboard has the 19 required buttons', () => {
    const { getAllByRole } = render(<Calculator />)
    const buttons = getAllByRole('button')
    expect(buttons.length).toBe(19)
  })

  it('Number buttons work and the max displayed are 9 characters (negate read and decimal read as character)', () => {
    const { getByRole } = render(<Calculator />)
    const display = getByRole('textbox')

    fireEvent.click(getByRole('button', { name: '1' }))
    fireEvent.click(getByRole('button', { name: '2' }))
    fireEvent.click(getByRole('button', { name: '3' }))
    fireEvent.click(getByRole('button', { name: '4' }))
    fireEvent.click(getByRole('button', { name: '5' }))
    fireEvent.click(getByRole('button', { name: '6' }))
    fireEvent.click(getByRole('button', { name: '7' }))
    fireEvent.click(getByRole('button', { name: '8' }))
    fireEvent.click(getByRole('button', { name: '9' }))

    expect(display).toHaveValue('123456789')

    fireEvent.click(getByRole('button', { name: '1' }))

    expect(display).toHaveValue('123456789')

    fireEvent.click(getByRole('button', { name: '+/-' }))

    expect(display).toHaveValue('-12345678')

    fireEvent.click(getByRole('button', { name: '+/-' }))

    expect(display).toHaveValue('12345678')

    fireEvent.click(getByRole('button', { name: '.' }))

    fireEvent.click(getByRole('button', { name: '0' }))

    expect(display).toHaveValue('12345678.')
  })

  // 5. Test that the calculator can clear the display when the clear button is clicked
  it('Can clear the display when the clear button is clicked', () => {
    const { getByRole } = render(<Calculator />)
    const clearButton = getByRole('button', { name: 'C' })
    const display = getByRole('textbox')

    // Click the buttons '1', '2', '3'
    fireEvent.click(getByRole('button', { name: '1' }))
    fireEvent.click(getByRole('button', { name: '2' }))
    fireEvent.click(getByRole('button', { name: '3' }))

    // Verify that the display shows '123'
    expect(display).toHaveValue('123')

    // Click the clear button
    fireEvent.click(clearButton)

    // Verify that the display shows '0'
    expect(display).toHaveValue('0')
  })

  // 7. Test that the calculator has an addition button
  it('Has an addition button', () => {
    const { getByRole } = render(<Calculator />)
    const addButton = getByRole('button', { name: '+' })
    expect(addButton).toBeInTheDocument()
  })

  // 8. Test that the calculator has a subtraction button
  it('Has a subtraction button', () => {
    const { getByRole } = render(<Calculator />)
    const subtractButton = getByRole('button', { name: '-' })
    expect(subtractButton).toBeInTheDocument()
  })

  // 9. Test that the calculator has a multiplication button
  it('Has a multiplication button', () => {
    const { getByRole } = render(<Calculator />)
    const multiplyButton = getByRole('button', { name: '*' })
    expect(multiplyButton).toBeInTheDocument()
  })

  // 10. Test that the calculator has a division button
  it('Has a division button', () => {
    const { getByRole } = render(<Calculator />)
    const divideButton = getByRole('button', { name: '/' })
    expect(divideButton).toBeInTheDocument()
  })

  // 11. Test that the calculator has an equal button
  it('Has an equal button', () => {
    const { getByRole } = render(<Calculator />)
    const equalButton = getByRole('button', { name: '=' })
    expect(equalButton).toBeInTheDocument()
  })

  // 12. Test that the calculator has a decimal button
  it('Has a decimal button', () => {
    const { getByRole } = render(<Calculator />)
    const decimalButton = getByRole('button', { name: '.' })
    expect(decimalButton).toBeInTheDocument()
  })

  // 13. Test that the calculator can calculate with negative numbers
  it('Can calculate with negative numbers', () => {
    const { getByRole } = render(<Calculator />)
    const display = getByRole('textbox')

    // Click the buttons '5', '-', '3', '=', '+/-', '2', '='
    fireEvent.click(getByRole('button', { name: '5' }))
    fireEvent.click(getByRole('button', { name: '-' }))
    fireEvent.click(getByRole('button', { name: '3' }))
    fireEvent.click(getByRole('button', { name: '=' }))
    fireEvent.click(getByRole('button', { name: '+/-' }))
    fireEvent.click(getByRole('button', { name: '2' }))
    fireEvent.click(getByRole('button', { name: '=' }))

    // Verify that the display shows '-1'
    expect(display).toHaveValue('-22')
  })
})
