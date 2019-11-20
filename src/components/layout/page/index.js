import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'

import SEO from './seo'
import Navbar from '../navbar'

const Layout = ({ children, title, navTheme, navChild }) => {
  return (
    <div>
      <CssBaseline />
      <SEO title={title} />
      <Navbar theme={navTheme} navChild={navChild} />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
