import React, { useEffect } from 'react'

import Typography from '@material-ui/core/Typography'

import PlaceSteps from './steps'

export default function Place ({
  typeList,
  featureList,
  socialList,
  addPlace,
}) {
  return (
    <PlaceSteps
      typeList={typeList}
      socialList={socialList}
      featureList={featureList}
      onSubmit={addPlace}
    />
  )
}
