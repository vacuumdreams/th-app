import React from 'react'

import ThApp from './src'

export const wrapRootElement = (props) => {
  return (
    <ThApp>
      {props.element}
    </ThApp>
  )
}
