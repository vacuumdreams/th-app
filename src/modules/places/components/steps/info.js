import React, { useState, useEffect } from 'react'
import useForm from 'react-hook-form'
import { formatIncompletePhoneNumber } from 'libphonenumber-js'

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
  name: yup.string().required('Business name has to be filled out'),
  email: yup.string().email('Has to be a valid email address'),
  phone: yup.string().phone('Has to be a valid phone number'),
  website: yup.string().url('Has to be a valid url format'),
  types: yup.array().of(yup.string()),
})

const getTypeFeatures = (types = []) => reduce((acc, { id, features }) => {
  if (types.indexOf(id) > -1) {
    return uniq(concat(acc, features))
  }
  return acc
}, [])

const normalizeSubmitData = (typeList, cb) => (data = {}) => {
  const placeTypes = pathOr([], ['types'], data)
    .filter((type) => type !== 'false')
  const placeFeatures = pathOr([], ['features'], data)
  // all available features based on selected types / 
  const typeFeatures = placeFeatures.length > 0 ? getTypeFeatures(placeTypes)(typeList) : []

  return cb({
    ...data,
    types: placeTypes,
    // filter features which might have been selected and now might be invalid because of potentially changed types
    features: placeFeatures.filter((feature) => typeFeatures.indexOf(feature) > -1),
  })
}

export default function PlaceInfo ({
  place = {},
  typeList = [],
  isBack,
  isNext,
  onNext,
  onBack,
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState,
    errors,
  } = useForm({
    mode: 'onBlur',
    validationSchema,
  })

  const errorMessages = {
    name: path(['name', 'message'], errors),
    email: path(['email', 'message'], errors),
    phone: path(['phone', 'message'], errors),
    website: path(['website', 'message'], errors),
  }

  return (
    <form>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        placeholder="Business name"
        name="name"
        defaultValue={pathOr('', ['name'], place)}
        inputProps={{
          ref: register,
        }}
        error={!!errorMessages.name}
        helperText={errorMessages.name}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        placeholder="Email"
        name="email"
        type="email"
        defaultValue={pathOr('', ['email'], place)}
        inputProps={{
          ref: register,
        }}
        error={!!errorMessages.email}
        helperText={errorMessages.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="phone"
        placeholder="Phone number"
        name="phone"
        type="tel"
        defaultValue={pathOr('', ['phone'], place)}
        inputProps={{
          ref: register,
          onChange: (e) => setValue('phone', formatIncompletePhoneNumber(e.target.value)),
        }}
        error={!!errorMessages.phone}
        helperText={errorMessages.phone}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="website"
        placeholder="Website"
        name="website"
        defaultValue={pathOr('', ['website'], place)}
        inputProps={{
          ref: register,
        }}
        error={!!errorMessages.website}
        helperText={errorMessages.website}
      />
      {
        typeList.map(({ id: typeId, name: typeName }, i) => (
          <div key={i}>
            <Category
              inputRef={register}
              name={`types[${i}]`}
              label={typeName}
              value={typeId}
              defaultIsActive={pathOr([], ['types'], place).indexOf(typeId) > -1}
            />
          </div>
        ))
      }
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            disabled={true}
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
            disabled={!isNext || (formState.touched.length === 0 ? false : !formState.isValid)}
            onClick={handleSubmit(normalizeSubmitData(typeList, onNext))}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
