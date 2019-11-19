import { compose, path } from 'ramda'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { withHandlers } from 'recompose'

import Signin from './components/sign-in'
import Signup from './components/sign-up'

const selector = ({ firebase }) => ({
  isLoaded: path(['auth'], firebase),
  isEmpty: path(['auth'], firebase),
  error: path(['authError'], firebase),
})

const signinWrapper = compose(
  withFirebase,
  withHandlers({
    signin: ({ firebase }) => firebase.login,
  }),
)

export const AuthSignin = connect(selector)(signinWrapper(Signin))

const signupWrapper = compose(
  withFirebase,
  withHandlers({
    signup: ({ firebase }) => ({
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
  }),
)

export const AuthSignup = connect(selector)(signupWrapper(Signup))
