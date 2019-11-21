import React, { useState } from 'react'
import { path, pathOr } from 'ramda'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import Layout from '../components/layout/page'

import Map from '../components/atom/map'
import MapSearch from '../components/atom/map/search'

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

const getQueryVars = (queryString) =>
  queryString
    .slice(1)
    .split('&')
    .reduce((acc, pair) => {
      const [key, value] = pair.split('=')
      return {
        ...acc,
        [key]: decodeURIComponent(value),
      }
    }, {})

export default function SearchPage ({
  location,
}) {
  const longitude = pathOr(0, ['state', 'center', '0'], location)
  const latitude = pathOr(0, ['state', 'center', '1'], location)

  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: (longitude && latitude) ? 12 : 0,
  })

  const qVars = getQueryVars(location.search)
  const defaultValue = pathOr(qVars.place || '', ['state', 'place_name'], location)

  return (
    <Layout
      title="Trashhold"
      navChild={(
        <div style={{ minWidth: '300px', width: '40vw', marginLeft: '1rem' }}>
          <MapSearch
            token={token}
            defaultValue={defaultValue}
            onSelect={(value) => {
              const [newLongitude, newLatitude] = pathOr([0, 0], ['center'], value)

              if (newLongitude && newLatitude) {
                setViewport({
                  longitude: newLongitude,
                  latitude: newLatitude,
                  zoom: 12,
                })
              }
            }}
          />
        </div>
      )}
    >
      <Grid container>
        <Grid item xs={12} sm={5} md={4}>
          <Paper style={{
            height: 'calc(100vh - 64px)',
          }}>
            <Container style={{ paddingTop: '1rem' }}>
              <Box style={{ backgroundColor: '#828282', width: '100%', paddingBottom: '50%', margin: '1rem 0' }} />
              <Box style={{ backgroundColor: '#828282', width: '100%', paddingBottom: '50%', margin: '1rem 0' }} />
              <Box style={{ backgroundColor: '#828282', width: '100%', paddingBottom: '50%', margin: '1rem 0' }} />
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <div style={{ position: 'sticky', top: '0' }}>
            <div style={{
              width: '100%',
              height: 'calc(100vh - 64px)',
            }}>
              <Map
                token={token}
                {...viewport}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </Layout>
  )
}
