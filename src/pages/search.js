import React, { useState, useRef } from 'react'
import { path, pathOr } from 'ramda'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Chip from '@material-ui/core/Chip'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import FilterList from '@material-ui/icons/FilterList'

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
  const filterRef = useRef()
  const [isFiltersOpen, setFiltersMenuOpen] = useState(false)

  useFirestoreConnect([
    { collection: 'place' },
    { collection: 'place-types' },
  ])

  const { places, placeTypes } = useSelector(({ firestore }) => ({
    places: pathOr({}, ['data', 'place'], firestore),
    placeTypes: pathOr({}, ['data', 'place-types'], firestore),
  }))

  console.log(places)

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
      <Grid container style={{ position: 'relative' }}>
        <Grid item xs={12} sm={5} md={4}>
          <Paper style={{
            minHeight: 'calc(100vh - 64px)',
          }}>
            <Toolbar>
              <div style={{ margin: '-0.25rem' }}>
                <Chip
                  ref={filterRef}
                  color="secondary"
                  variant="outlined"
                  label="Categories"
                  style={{ margin: '0.25rem' }}
                  onClick={() => setFiltersMenuOpen(true)}
                />
                <Chip
                  ref={filterRef}
                  color="secondary"
                  variant="outlined"
                  label="Features"
                  style={{ margin: '0.25rem' }}
                  onClick={() => setFiltersMenuOpen(true)}
                />
              </div>
              <Menu open={isFiltersOpen} anchorEl={filterRef.current}>
                <div>
                  <ClickAwayListener onClickAway={() => setFiltersMenuOpen(false)}>
                    <MenuList>
                      {
                        Object.keys(placeTypes).map((id, i) => {
                          const { name, icon } = placeTypes[id]
                          return (
                            <MenuItem key={i}>
                              <IconButton variant="outlined" color="secondary" onClick={() => {}}>
                                <Icon color="secondary">{icon}</Icon>
                              </IconButton>
                              <Typography style={{ margin: '0 2rem 0 0.5rem' }}>{name}</Typography>
                            </MenuItem>
                          )
                        })
                      }
                    </MenuList>
                  </ClickAwayListener>
                </div>
              </Menu>
            </Toolbar>
            <Divider />
            <Container style={{ paddingTop: '1rem' }}>
              <Typography variant="h5">2 results</Typography>
              <Card style={{ boxShadow: 'none', border: '1px solid grey', margin: '2rem 0' }}>
                <CardActionArea>
                  <CardMedia>
                    <Box style={{ backgroundColor: '#828282', width: '100%', paddingBottom: '45%' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography>The hipsters go here</Typography>
                  </CardContent>
                  <CardActions>
                    <Icon>storefront</Icon>
                    <Icon>local_cafe</Icon>
                    <Icon style={{ marginLeft: 'auto' }}>star</Icon>
                    <Typography component="span">3.9</Typography>
                    <Icon>rate_review</Icon>
                    <Typography component="span">16</Typography>
                  </CardActions>
                </CardActionArea>
              </Card>
              <Divider style={{ margin: '1rem 0' }} />
              <Card style={{ boxShadow: 'none', border: '1px solid grey', margin: '2rem 0' }}>
                <CardActionArea>
                  <CardMedia>
                    <Box style={{ backgroundColor: '#828282', width: '100%', paddingBottom: '45%' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography>Fancy shit</Typography>
                  </CardContent>
                  <CardActions>
                    <Icon>local_cafe</Icon>
                    <Icon style={{ marginLeft: 'auto' }}>star</Icon>
                    <Typography component="span">4.6</Typography>
                    <Icon>rate_review</Icon>
                    <Typography component="span">129</Typography>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <div style={{ position: 'fixed', top: '64px', right: '0', width: '100%' }}>
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
