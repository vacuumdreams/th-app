import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Map from '../../../../components/atom/map'

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

export default function PlaceReview ({
  place,
  onBack,
  onSubmit,
}) {
  return (
    <div>
      <div style={{ width: '100%', height: '200px' }}>
        <Map token={token} pins={[place.coordinates]} />
      </div>
      <div>
        <Typography>
          Name: {place.name}
        </Typography>
        <Typography>
          Address: {place.address1}, {place.city}, {place.country.name}, {place.zip}
        </Typography>
        {
          place.website && (
            <Typography>
              Website: {place.website}
            </Typography>
          )
        }
        {
          place.phone && (
            <Typography>
              Phone number: {place.phone}
            </Typography>
          )
        }
        {
          place.types.length > 0 && (
            <Typography>
              Categories: {place.types.join(', ')}
            </Typography>
          )
        }
        {
          place.features.length > 0 && (
            <Typography>
              Features: {place.features.join(', ')}
            </Typography>
          )
        }
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            disabled={false}
            onClick={onBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            disabled={false}
            onClick={() => onSubmit(place)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
