import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export default (moduleReducers = {}) => combineReducers({
  ...moduleReducers,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})
