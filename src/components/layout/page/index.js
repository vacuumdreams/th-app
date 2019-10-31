import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'

import SEO from './seo'

const Layout = ({ children, title }) => {
  console.log('layout')
  return (
    <div>
      <CssBaseline />
      <SEO title={title} />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
