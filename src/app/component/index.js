import React from 'react'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { ThemeProvider } from '@material-ui/core/styles'

export default function App ({ children, theme, store, services }) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        config={{}}
        firebase={services.firebase}
        dispatch={store.dispatch}
      >
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
