import React from 'react'

import Layout from '../components/layout/page'
import { AuthSignup } from '../modules/auth'

export default function SigninPage ({ location, navigate }) {
  return (
    <Layout title="Trashhold - Sign up">
      <AuthSignup />
    </Layout>
  )
}
