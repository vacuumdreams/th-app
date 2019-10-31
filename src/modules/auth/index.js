import { connect } from 'react-redux'

import Signin from './component/sign-in'
import Signup from './component/sign-up'

const enhance = connect(
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile,
  })
)

export const AuthSignin = enhance(Signin)

export const AuthSignup = enhance(Signup)
