import React from 'react'
import { compose, path } from 'ramda'
import { connect } from 'react-redux'

import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

import Signin from './components/sign-in'
import Signup from './components/sign-up'

export function AuthSignin () {
  const firebase = useFirebase()
  const auth = useSelector(({ firebase }) => ({
    isLoaded: path(['auth'], firebase),
    isEmpty: path(['auth'], firebase),
    error: path(['authError', 'message'], firebase),
  }))

  return (
    <Signin {...auth} signin={firebase.login} />
  )
}

export function AuthSignup () {
  const firebase = useFirebase()
  const auth = useSelector(({ firebase }) => ({
    isLoaded: path(['auth'], firebase),
    isEmpty: path(['auth'], firebase),
    error: path(['authError', 'message'], firebase),
  }))

  const signup = ({
    email,
    password,
    firstName,
    lastName,
  }) => firebase.createUser({
    email,
    password,
    displayName: `${firstName} ${lastName}`,
    metadata: {
      firstName,
      lastName,
    },
  })

  return (
    <Signup {...auth} signup={signup} />
  )
}
