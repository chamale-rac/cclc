import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div
      id="error-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '90vh',
        color: '#f94149',
        fontFamily: "'TT Bricks Trial', sans-serif",
      }}
    >
      <img
        src="./calc.svg"
        style={{
          width: '10rem',
          height: '10rem',
        }}
      />
      <h1
        style={{
          fontSize: '5rem',
          textAlign: 'center',
        }}
      >
        Oops!
      </h1>
      <p
        style={{
          fontSize: '2.4rem',
          fontWeight: '400',
          textAlign: 'center',
        }}
      >
        Sorry, an unexpected error has occurred.
      </p>
      <p
        style={{
          fontSize: '1.6rem',
          fontWeight: '500',

          textAlign: 'center',
        }}
      >
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
