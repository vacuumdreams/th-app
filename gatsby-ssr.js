import React from 'react'
import { XMLHttpRequest } from 'xmlhttprequest'

import ThApp from './src'

global.XMLHttpRequest = XMLHttpRequest

export const wrapRootElement = (props) => {
  return (
    <ThApp>
      {props.element}
    </ThApp>
  )
}
