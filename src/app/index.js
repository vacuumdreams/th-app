import React from 'react'
import { createStore } from 'redux'

import AppComoponent from './component'
import state from './store/state'
import reducer from './store/reducer'

const store = (modules) => createStore(reducer(modules), state)

export default function App ({ children, modules, services }) {
  return (
    <AppComoponent store={store(modules)} services={services}>
      {children}
    </AppComoponent>
  )
}
