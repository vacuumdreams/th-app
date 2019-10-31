import React from 'react'
import ThApp from './src'

export const wrapPageElement = (props) => {
  console.log('page.', props)
  return (
    <div>
      {props.element}
    </div>
  )
}

export const wrapRootElement = (props) => {
  console.log('root.', props)
  return (
    <ThApp>
      {props.element}
    </ThApp>
  )
}
