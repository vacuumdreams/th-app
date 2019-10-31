import React, { PureComponent } from 'react'

import Layout from '../components/layout/page'
import { AuthSignin } from '../modules/auth'

class SigninPage extends PureComponent {
  render () {
    // const { location, navigate } = this.props
    return (
      <Layout title="Trashhold - Sign in">
        <AuthSignin />
      </Layout>
    )
  }
}

export default SigninPage
