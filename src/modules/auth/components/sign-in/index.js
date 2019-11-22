import React, { useState, useEffect } from 'react'
import { Link as AppLink } from 'gatsby'
import { isEmpty, path } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import useForm from 'react-hook-form'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Notification from '../../../../components/atom/notification'
import Loading from '../../../../components/atom/loading'

import yup from '../../../../services/validation'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 0, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}))

const validationSchema = yup.object().shape({
  email: yup.string().required('Please fill in your email address').email('Has to be a valid email'),
  password: yup.string().required('Please fill in your password'),
})

export default function SignIn ({
  error = null,
  onSignin,
}) {
  const classes = useStyles()
  const [remember, setRemember] = useState(false)
  const [submitError, setError] = useState(error)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setError(error)
  }, [error])

  const {
    register,
    handleSubmit,
    errors,
  } = useForm({
    validationSchema,
  })

  const errorMessages = {
    email: path(['email', 'message'], errors),
    password: path(['password', 'message'], errors),
  }

  return (
    <Loading isLoading={isLoading}>
      <Container component="main" maxWidth="xs">
        {
          submitError && (
            <Notification type="error" onClose={() => setError(null)}>
              {submitError}
            </Notification>
          )
        }
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit((data) => {
              setLoading(true)
              onSignin({ ...data, remember })
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
            })}
            noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              inputProps={{
                ref: register,
                readOnly: isLoading,
              }}
              error={!!errorMessages.email}
              helperText={errorMessages.email}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{
                ref: register,
                readOnly: isLoading,
              }}
              error={!!errorMessages.password}
              helperText={errorMessages.password}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
              )}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="outlined"
              color="primary"
              disabled={!isEmpty(errors) || isLoading}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2" component={AppLink} state={{ modal: true }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Loading>
  )
}