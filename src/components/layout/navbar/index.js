import React from 'react'

import { Link } from 'gatsby'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Person from '@material-ui/icons/Person'

import logo from '../../../static/images/trash.png'

export default function Navbar ({ theme = 'page', navChild }) {
  return (
    <AppBar
      position="sticky"
      color={theme === 'home' ? 'default' : 'primary'}
      style={{
        backgroundColor: theme === 'home' ? 'rgba(0,0,0,0)' : undefined,
        boxShadow: theme === 'home' ? 'none' : undefined,
      }}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Grid container alignItems="center">
                <Grid item>
                  <img src={logo} width={40} height={40} />
                </Grid>
                {
                  theme === 'home' && (
                    <Grid item>
                      <Typography component="span" style={{ marginLeft: '1rem' }}>t r a s h h o l d</Typography>
                    </Grid>
                  )
                }
              </Grid>
            </Link>
          </Grid>
          <Grid item>
            {navChild}
          </Grid>
        </Grid>
        <Link to="/sign-in" style={{ color: 'inherit' }}>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
