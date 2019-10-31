import React from 'react'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

export default function App ({ children, store, services }) {
  console.log('app rerender')
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        config={{}}
        firebase={services.firebase}
        dispatch={store.dispatch}
      >
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
