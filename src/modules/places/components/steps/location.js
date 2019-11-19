import fetch from 'isomorphic-unfetch'
import { useStaticQuery, graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import useForm from 'react-hook-form'

import {
  path,
  pathOr,
} from 'ramda'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete'

import Notification from '../../../../components/atom/notification'

import yup from '../../../../services/validation'
import searchLocation from '../../../../services/map/search'

const validationSchema = yup.object().shape({
  address1: yup.string().required('This field is required'),
  address2: yup.string(),
  city: yup.string().required('This field is required'),
  country: yup.object().shape({
    name: yup.string().required('This field is required'),
    code: yup.string().required('This field is required'),
  }),
  zip: yup.string().required('This field is required'),
})

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

const onSubmit = (onSuccess, onError) => (data) => {
  const query = `${data.address1} ${data.address2}, ${data.city}, ${data.country.name}, ${data.zip}`

  searchLocation({
    token,
    query,
    country: data.country.code,
    limit: 1,
    autocomplete: false,
  })
    .then((results) => {
      const coordinates = pathOr([], ['0', 'geometry', 'coordinates'], results)
      onSuccess({
        ...data,
        coordinates,
      })
    })
    .catch((err) => {
      onError(err.message)
    })
}

export default function PlaceLocation ({
  place = {},
  isBack,
  isNext,
  onNext,
  onBack,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState,
    errors,
  } = useForm({
    mode: 'onBlur',
    validationSchema,
    defaultValues: {
      country: pathOr({}, ['country'], place),
    },
  })

  const [submitError, setSubmitError] = useState(undefined)
  const countries = pathOr([], ['site', 'siteMetadata', 'countries'], useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          countries {
            name
            code
            continent
            emoji
            languages
            phone
          }
        }
      }
    }
  `))

  useEffect(() => {
    register({ name: 'country', type: 'custom' })
  }, [])

  const values = getValues()

  const errorMessages = {
    address1: path(['address1', 'message'], errors),
    address2: path(['address2', 'message'], errors),
    city: path(['city', 'message'], errors),
    country: path(['country', 'message'], errors),
    zip: path(['zip', 'message'], errors),
  }

  return (
    <div>
      {
        submitError && (
          <Notification type="error" onClose={() => setSubmitError(undefined)}>
            {submitError}
          </Notification>
        )
      }
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="address1"
        placeholder="Address line 1"
        name="address1"
        defaultValue={pathOr('', ['address1'], place)}
        inputProps={{
          ref: register,
        }}
        error={!!errorMessages.address1}
        helperText={errorMessages.address1}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="address2"
        placeholder="Address line 2"
        name="address2"
        defaultValue={pathOr('', ['address2'], place)}
        inputProps={{
          ref: register,
        }}
        error={!!errorMessages.address2}
        helperText={errorMessages.address2}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="city"
        placeholder="City"
        name="city"
        defaultValue={pathOr('', ['city'], place)}
        inputProps={{
          ref: register,
        }}
        error={!!errorMessages.city}
        helperText={errorMessages.city}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={countries}
            getOptionLabel={pathOr('', ['name'])}
            value={values.country}
            onChange={(event, value) => setValue('country', value === null ? {} : value)}
            renderOption={({ name, emoji }) => (
              <span>{emoji} {name}</span>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="country"
                placeholder="Country"
                name="country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'disabled',
                }}
                error={!!errorMessages.country}
                helperText={errorMessages.country}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="zip"
            placeholder="Postal/zip code"
            name="zip"
            defaultValue={pathOr('', ['zip'], place)}
            inputProps={{
              ref: register,
            }}
            error={!!errorMessages.zip}
            helperText={errorMessages.zip}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            disabled={!isBack || (formState.touched.length === 0 ? false : !formState.isValid)}
            onClick={handleSubmit(onSubmit(onBack, setSubmitError))}
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
            disabled={!isNext || (formState.touched.length === 0 ? false : !formState.isValid)}
            onClick={handleSubmit(onSubmit(onNext, setSubmitError))}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
