import React from 'react'
import { createStore, applyMiddleware } from 'redux'

import AppComoponent from './component'
import state from './store/state'
import reducer from './store/reducer'
import middlewares from './store/middlewares'
import theme from './theme'

const store = (modules) => createStore(
  reducer(modules),
  state,
  applyMiddleware(...middlewares),
)

export default function App ({ children, modules, services }) {
  return (
    <AppComoponent
      theme={theme}
      store={store(modules)}
      services={services}
    >
      {children}
    </AppComoponent>
  )
}
