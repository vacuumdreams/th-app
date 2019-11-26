import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Link } from 'gatsby'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '5rem',
    minWidth: '80%',
    maxWidth: '500px',
    padding: '2rem',
  },
  buttons: {
    marginTop: '2rem',
  },
}))

export default function AlreadySignedInGuard ({ onLogout }) {
  const classes = useStyles()
  return (
    <Container>
      <Grid container justify="center">
        <Grid item>
          <Paper className={classes.container}>
            <Typography variant="h5" gutterBottom={true}>You are already logged in!</Typography>
            <Grid container spacing={2} className={classes.buttons}>
              <Grid item xs={6}>
                <Button
                  size="large"
                  fullWidth
                  color="primary"
                  variant="outlined"
                  component={Link}
                  to="/"
                >
                  Go back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  size="large"
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
