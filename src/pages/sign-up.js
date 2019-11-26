import React from 'react'
import moment from 'moment'
import { pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import Layout from '../components/layout/page'
import Loading from '../components/atom/loading'
import { AuthSignup, AuthGuard, AuthWelcome } from '../modules/auth'

const oneDay = moment.duration(1, 'day')

const isRecent = (time) => (
  moment().subtract(oneDay).isBefore(moment(time))
)

export default function SignupPage () {
  const auth = useSelector(({ firebase }) => ({
    isLoaded: pathOr(false, ['auth', 'isLoaded'], firebase),
    isEmpty: pathOr(true, ['auth', 'isEmpty'], firebase),
    error: pathOr('', ['authError', 'message'], firebase),
    createdAt: pathOr(0, ['auth', 'createdAt'], firebase),
  }))

  const b = useSelector(({ firebase }) => {
    console.log(firebase)
    return firebase.auth
  })

  const isUserRecentlyCreated = isRecent(parseInt(auth.createdAt, 10))
  console.log(isUserRecentlyCreated)

  return (
    <Layout title="Trashhold - Sign up">
      {
        auth.isEmpty && (
          <Loading isLoading={!auth.isLoaded}>
            <AuthSignup />
          </Loading>
        )
      }
      {
        auth.isLoaded && !auth.isEmpty && (
          <div>
            {
              isUserRecentlyCreated && (
                <AuthWelcome />
              )
            }
            {
              !isUserRecentlyCreated && (
                <AuthGuard />
              )
            }
          </div>
        )
      }
    </Layout>
  )
}
