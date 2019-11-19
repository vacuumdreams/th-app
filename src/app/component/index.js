import React from 'react'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { ThemeProvider } from '@material-ui/core/styles'

export default function App ({ theme, store, services, children }) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        config={{}}
        firebase={services.firebase}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
