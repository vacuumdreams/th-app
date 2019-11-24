import React, { useState } from 'react'
import { path, pathOr } from 'ramda'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Layout from '../components/layout/page'

import Map from '../components/atom/map'
import MapSearch from '../components/atom/map/search'

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

export default function IndexPage ({
  navigate,
  location,
}) {
  return (
    <Layout
      title="Trashhold"
      navTheme="home"
    >
      <div className="map" style={{ marginTop: '-64px' }}>
        <Container style={{ paddingTop: '124px' }}>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h1" style={{ opacity: '0.4', marginTop: '2rem' }}>
                life in plastic,<br /> it's <span style={{ fontFamily: 'Gloria Hallelujah' }}>NOT</span> fantastic.
              </Typography>
              <div style={{ height: '2rem' }} />
              <MapSearch
                token={token}
                autoFocus
                onSelect={(value) => {
                  navigate(`/search/?place=${encodeURIComponent(value.place_name)}`, {
                    state: value,
                  })
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  )
}
