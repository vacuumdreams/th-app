import React from 'react'
import ThApp from './src'

export const wrapPageElement = (props) => {
  return (
    <div>
      {props.element}
    </div>
  )
}

export const wrapRootElement = (props) => {
  return (
    <ThApp>
      {props.element}
    </ThApp>
  )
}
