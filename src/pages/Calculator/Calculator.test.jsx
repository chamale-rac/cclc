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

  it('Number buttons work and the max displayed are 9 characters', () => {
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
  })

  it('Negate button reads as character', () => {
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
    fireEvent.click(getByRole('button', { name: '+/-' }))
    fireEvent.click(getByRole('button', { name: '0' }))

    expect(display).toHaveValue('-12345678')

    fireEvent.click(getByRole('button', { name: '+/-' }))

    expect(display).toHaveValue('12345678')
  })

  it('Decimal button reads as character', () => {
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
    fireEvent.click(getByRole('button', { name: '.' }))
    fireEvent.click(getByRole('button', { name: '0' }))

    expect(display).toHaveValue('12345678.')
  })

  it('Can clear the display when the clear button is clicked', () => {
    const { getByRole } = render(<Calculator />)
    const clearButton = getByRole('button', { name: 'C' })
    const display = getByRole('textbox')

    fireEvent.click(getByRole('button', { name: '1' }))
    fireEvent.click(getByRole('button', { name: '2' }))
    fireEvent.click(getByRole('button', { name: '3' }))

    expect(display).toHaveValue('123')

    fireEvent.click(clearButton)

    expect(display).toHaveValue('0')
  })

  it('Can calculate with negative numbers', () => {
    const { getByRole } = render(<Calculator />)
    const display = getByRole('textbox')

    fireEvent.click(getByRole('button', { name: '5' }))
    fireEvent.click(getByRole('button', { name: '-' }))
    fireEvent.click(getByRole('button', { name: '3' }))
    fireEvent.click(getByRole('button', { name: '=' }))
    fireEvent.click(getByRole('button', { name: '+/-' }))
    fireEvent.click(getByRole('button', { name: '2' }))
    fireEvent.click(getByRole('button', { name: '=' }))

    expect(display).toHaveValue('-22')
  })

  it('0 cant be negated', () => {
    const { getByRole } = render(<Calculator />)
    const display = getByRole('textbox')

    expect(display).toHaveValue('0')
    fireEvent.click(getByRole('button', { name: '+/-' }))
    expect(display).toHaveValue('0')
  })
})
