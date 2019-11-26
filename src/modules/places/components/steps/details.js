import React, { useState } from 'react'
import useForm from 'react-hook-form'

import {
  concat,
  path,
  pathOr,
  uniq,
} from 'ramda'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import Category from '../atom/category'

import yup from '../../../../services/validation'

const validationSchema = yup.object().shape({
  description: yup.string()
    .required('This field is required')
    .min(50, 'Has to be minimum 50 characters length'),
  features: yup.array().of(yup.string()),
})

const getAvailableFeatures = (placeTypes = [], typeList = [], featuresList = []) => {
  const typeFeatures = typeList.reduce((acc, { id, features }) => {
    if (placeTypes.indexOf(id) > -1) {
      return uniq(concat(acc, features))
    }
    return acc
  }, [])

  return featuresList.filter(({ id }) => typeFeatures.indexOf(id) > -1)
}

const normalizeSubmitData = (cb) => (data = {}) => {
  const placeFeatures = pathOr([], ['features'], data)
  return cb({
    ...data,
    features: placeFeatures.filter((feature) => feature !== 'false'),
  })
}

export default function PlaceDetails ({
  place = {},
  typeList = [],
  featureList = [],
  onNext,
  onBack,
}) {
  const {
    register,
    handleSubmit,
    errors,
  } = useForm({
    validationSchema,
  })

  const errorMessages = {
    description: path(['description', 'message'], errors),
  }

  const availableFeatures = getAvailableFeatures(place.types, typeList, featureList)

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        multiline
        fullWidth
        rows={8}
        id="description"
        placeholder="Description"
        name="description"
        defaultValue={pathOr('', ['description'], place)}
        inputProps={{
          ref: register,
        }}
        error={!!errorMessages.description}
        helperText={errorMessages.description}
        autoFocus
      />
      {
        availableFeatures.map(({ id: featureId, name: featureName }, i) => (
          <div key={i}>
            <Category
              inputRef={register}
              name={`features[${i}]`}
              label={featureName}
              value={featureId}
              defaultIsActive={pathOr([], ['features'], place).indexOf(featureId) > -1}
            />
          </div>
        ))
      }
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            disabled={false}
            onClick={handleSubmit(normalizeSubmitData(onBack))}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            disabled={false}
            onClick={handleSubmit(normalizeSubmitData(onNext))}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
