import React, { useState, useEffect } from 'react'
import { path } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

const typeMap = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: path(['palette', 'success', 'main'], theme),
  },
  warning: {
    backgroundColor: path(['palette', 'warning', 'main'], theme),
  },
  error: {
    backgroundColor: path(['palette', 'error', 'main'], theme),
  },
  info: {
    backgroundColor: path(['palette', 'info', 'main'], theme),
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
}))

export default function NotificationBar ({
  type = 'info',
  onClose = () => {},
  children,
}) {
  const classes = useStyles()
  const [isOpen, setOpen] = useState(false)

  const closeHandler = () => {
    setOpen(false)
    // allow for the animation to finish
    setTimeout(() => {
      onClose()
    }, 200)
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  const Icon = typeMap[type]
  const className = classes[type]

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isOpen}
      onClose={closeHandler}
    >
      <SnackbarContent
        className={className}
        message={(
          <Typography>
            <Icon color="inherit" className={classes.icon} />
            <span>{children}</span>
          </Typography>
        )}
        action={(
          <IconButton onClick={closeHandler}>
            <CloseIcon />
          </IconButton>
        )}
      />
    </Snackbar>
  )
}
