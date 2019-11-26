import React from 'react'
import { compose, path } from 'ramda'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'

import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

import Signin from './components/sign-in'
import Signup from './components/sign-up'
import SignedGuard from './components/guard/signed'
import Welcome from './components/guard/welcome'

export function AuthSignin () {
  const firebase = useFirebase()
  const auth = useSelector(({ firebase }) => ({
    isLoaded: path(['auth'], firebase),
    isEmpty: path(['auth'], firebase),
    error: path(['authError', 'message'], firebase),
  }))

  return (
    <Signin {...auth} onSignin={(data) => {
      if (!data.remember) {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => firebase.login(data))
          .then(() => {
            navigate('/')
          })
      }
      return firebase.login(data)
        .then(() => {
          navigate('/')
        })
    }} />
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
    <Signup {...auth} onSignup={signup} />
  )
}

export function AuthGuard () {
  const firebase = useFirebase()
  return (
    <SignedGuard onLogout={() => firebase.logout()} />
  )
}

export function AuthWelcome () {
  return (
    <Welcome onContinue={() => navigate('/')} />
  )
}
