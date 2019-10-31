import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Link } from 'gatsby'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Person from '@material-ui/icons/Person'

import SEO from './seo'

const Layout = ({ children, title }) => {
  return (
    <div>
      <CssBaseline />
      <SEO title={title} />
      <AppBar>
        <Toolbar>
          <Link to="/sign-in">
            <IconButton>
              <Person />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
