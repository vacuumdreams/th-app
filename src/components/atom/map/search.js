import React, { useState, useEffect, useMemo } from 'react'
import throttle from 'lodash/throttle'
import {
  path,
  pathOr,
} from 'ramda'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Room from '@material-ui/icons/Room'
import Search from '@material-ui/icons/Search'

import searchLocation from '../../../services/map/search'

const onSearch = ({ token, query }) => searchLocation({
  token,
  query,
  limit: 5,
  autocomplete: false,
})

export default function MapSearch ({
  token,
  defaultValue = '',
  autoFocus,
  onSelect = () => {},
}) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [options, setOptions] = useState([])

  const handleSearch = useMemo(() => (
    throttle(onSearch, 200)
  ))

  useEffect(() => {
    setQuery(defaultValue)
  }, [])

  useEffect(() => {
    if (error) {
      setError('')
    }

    if (query === '') {
      setOptions([])
    } else {
      handleSearch({ token, query })
        .then((features = []) => {
          setOptions(features)
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [query])

  return (
    <Autocomplete
      options={options}
      getOptionLabel={pathOr('', ['place_name'])}
      inputValue={query}
      freeSolo
      includeInputInList
      disableOpenOnFocus
      onChange={(event, value) => {
        onSelect(typeof value === 'string' ? options[0] : value)
      }}
      onInputChange={(event, value) => {
        setQuery(value)
      }}
      renderOption={({ place_name: name }) => {
        const matches = match(name, query)
        const parts = parse(name, matches)
        return (
          <Grid
            container
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item>
              <Room color="primary" style={{ marginRight: '0.5rem' }}/>
            </Grid>
            <Grid item>
              {
                parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 600 : 300 }}>
                    {part.text}
                  </span>
                ))
              }
            </Grid>
          </Grid>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          required
          fullWidth
          autoFocus={autoFocus}
          id="country"
          placeholder="Search for places"
          name="country"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Search color="inherit" />
              </InputAdornment>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          error={!!error}
          helperText={error}
        />
      )}
    />
  )
}
