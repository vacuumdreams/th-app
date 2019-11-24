import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Link } from 'gatsby'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Person from '@material-ui/icons/Person'
import RestoreFromTrash from '@material-ui/icons/RestoreFromTrash'

import logo from '../../../static/images/trash.png'

const useStyles = makeStyles((theme) => ({
  logo: {
    border: '2px solid',
    padding: '0.5rem',
  },
  logoInner: {
    transform: 'scale(0.75)',
  },
}))

export default function Navbar ({ auth = {}, theme = 'page', navChild }) {
  const classes = useStyles()

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
                <Grid item width="3rem">
                  <IconButton
                    color={theme === 'home' ? 'secondary' : 'default'}
                    className={classes.logo}
                    style={{ borderColor: theme === 'home' ? '#C79F63' : '#fff' }}
                  >
                    <RestoreFromTrash className={classes.logoInner}  />
                  </IconButton>
                </Grid>
                {
                  !navChild && (
                    <Grid item>
                      <Typography
                        color="textPrimary"
                        component="span"
                        style={{ marginLeft: '1rem' }}
                      >
                        t r a s h h o l d
                      </Typography>
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
        <div>
          {
            auth.isLoaded && !auth.isEmpty && (
              <IconButton color={theme === 'home' ? 'primary' : 'inherit'}>
                <Person />
              </IconButton>
            )
          }
          {
            auth.isLoaded && auth.isEmpty && (
              <Grid container spacing={1} wrap="nowrap">
                <Grid item>
                  <Link to="/sign-in" style={{ color: 'inherit', textDecoration: 'none'  }}>
                    <Button color={theme === 'home' ? 'primary' : 'default'} variant="outlined">
                      <span style={{ whiteSpace: 'nowrap' }}>Login</span>
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/sign-up" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Button color={theme === 'home' ? 'primary' : 'default'} variant="contained">
                      <span style={{ whiteSpace: 'nowrap' }}>Sign up</span>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            )
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}
