import React from 'react'
import { path, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'

import SEO from './seo'
import Navbar from '../navbar'

const Layout = ({
  children,
  title,
  navTheme,
  navChild,
}) => {
  const auth = useSelector(({ firebase }) => ({
    isLoaded: pathOr(false, ['auth', 'isLoaded'], firebase),
    isEmpty: pathOr(true, ['auth', 'isEmpty'], firebase),
    error: pathOr('', ['authError', 'message'], firebase),
  }))

  return (
    <div>
      <CssBaseline />
      <SEO title={title} />
      <Navbar
        auth={auth}
        theme={navTheme}
        navChild={navChild}
      />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
