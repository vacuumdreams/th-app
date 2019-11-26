import React, { useState, useEffect } from 'react'
import { Link as AppLink } from 'gatsby'
import { isEmpty, path } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import useForm from 'react-hook-form'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}))

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Please fill in your first name'),
  lastName: yup.string().required('Please fill in your last name'),
  email: yup.string().required('Please fill in your email address').email('Has to be a valid email'),
  password: yup.string().required('Please fill in your password'),
})

export default function SignUp ({
  error = null,
  onSignup,
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
    firstName: path(['firstName', 'message'], errors),
    lastName: path(['lastName', 'message'], errors),
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
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data)
              setLoading(true)
              onSignup(data)
                .then(() => setLoading(false))
                .catch(() => setLoading(false))
              })
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
                  inputProps={{
                    ref: register,
                    readOnly: isLoading,
                  }}
                  error={!!errorMessages.firstName}
                  helperText={errorMessages.firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  inputProps={{
                    ref: register,
                    readOnly: isLoading,
                  }}
                  error={!!errorMessages.lastName}
                  helperText={errorMessages.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              disabled={!isEmpty(errors) || isLoading}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2" component={AppLink} state={{ modal: true }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Loading>
  )
}
