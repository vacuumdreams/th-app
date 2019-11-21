import React from 'react'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import Layout from '../components/layout/page'
import Loading from '../components/atom/loading'
import { AuthSignin, AuthGuard } from '../modules/auth'

export default function SigninPage () {
  const auth = useSelector(({ firebase }) => ({
    isLoaded: pathOr(false, ['auth', 'isLoaded'], firebase),
    isEmpty: pathOr(true, ['auth', 'isEmpty'], firebase),
    error: pathOr('', ['authError', 'message'], firebase),
  }))

  return (
    <Layout title="Trashhold - Sign in">
      {
        auth.isEmpty && (
          <Loading isLoading={!auth.isLoaded}>
            <AuthSignin />
          </Loading>
        )
      }
      {
        auth.isLoaded && !auth.isEmpty && (
          <AuthGuard />
        )
      }
    </Layout>
  )
}
