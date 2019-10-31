import React, { Fragment, PureComponent } from 'react'

import Dialog from '@material-ui/core/Dialog'

import {
  ModalProvider,
  ModalComponent,
} from '../app/component/context/modal'

import Layout from '../components/layout/page'

import { AuthSignin } from '../modules/auth'
import Map from '../modules/map'

class SigninPage extends PureComponent {
  render () {
    const { location, navigate } = this.props
    return (
      <Layout title="Trashhold - Sign in">
        <AuthSignin />
      </Layout>
    )
  }
}

export default SigninPage
