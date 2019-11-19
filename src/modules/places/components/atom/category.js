import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function PlaceCategory ({
  inputRef,
  name,
  value,
  label,
  defaultIsActive = false,
}) {
  return (
    <FormControlLabel
      label={label}
      control={(
        <Checkbox
          inputRef={inputRef}
          name={name}
          value={value}
          color="primary"
          defaultChecked={defaultIsActive}
        />
      )}
    />
  )
}
