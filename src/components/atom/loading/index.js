import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: '2',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s',
  },
  loaderActive: {
    opacity: '1',
  },
  loaderInactive: {
    opacity: '0',
  },
  passive: {
    opacity: '0.35',
    transition: 'opacity 0.2s',
  },
}))

export default function Loading ({
  isLoading,
  children,
}) {
  const classes = useStyles()
  const [isLoaderDisplayed, setLoaderDisplay] = useState(isLoading)

  useEffect(() => {
    setTimeout(() => setLoaderDisplay(isLoading), 300)
  }, [isLoading])

  return (
    <div className={classes.wrapper}>
      <div className={isLoading ? classes.passive : ''}>
        {children}
      </div>
      {
        isLoaderDisplayed && (
          <div className={[classes.loader, isLoading ? classes.loaderActive : classes.loaderInactive].join(' ')}>
            <CircularProgress color="primary" />
          </div>
        )
      }
    </div>
  )
}
