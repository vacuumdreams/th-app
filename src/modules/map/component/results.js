import React from 'react'
import { Link } from 'gatsby'

import IconButton from '@material-ui/core/IconButton'

import Person from '@material-ui/icons/Person'

export default function MapResults () {
  console.log('rerender this shit')
  return (
    <div className="map--search-nav">
      <IconButton>
        <Link to="/sign-in" state={{ modal: true, noScroll: true }}>
          <Person />
        </Link>
      </IconButton>
    </div>
  )
}
