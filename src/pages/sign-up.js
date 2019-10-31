import React from 'react'

import Dialog from '@material-ui/core/Dialog'

import Layout from '../components/layout/page'
import { AuthSignup } from '../modules/auth'
import Map from '../modules/map'

export default function SigninPage ({ location, navigate }) {
  return (
    <Layout title="Trashhold - Sign up">
      <AuthSignup />
    </Layout>
  )
}
