import "mapbox-gl/dist/mapbox-gl.css"
import React, { Component } from 'react'

import MuiGeocoder from 'react-mui-mapbox-geocoder'
import Typography from '@material-ui/core/Typography'

import Map from '../../components/atom/map'

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

// class SearchableMap extends Component {
//   state = {
//     searchResultLayer: null,
//   }

  // handleOnResult = (event) => {
  //   const { GeoJsonLayer } = this.state
  //   if (GeoJsonLayer) {
  //     this.setState({
  //       searchResultLayer: new GeoJsonLayer({
  //         id: "search-result",
  //         data: event.result.geometry,
  //         getFillColor: [255, 0, 0, 128],
  //         getRadius: 1000,
  //         pointRadiusMinPixels: 10,
  //         pointRadiusMaxPixels: 10,
  //       })
  //     })
  //   }
  // }

export default function SearchableMap () {
  return (
    <div className="map">
      <div className="map--item">
        <Map token={token} />
      </div>
      <section className="">
        <div className="map--title">
          <Typography variant="h1">
            Life in plastic,<br /> it's <span className="is-family-secondary">NOT</span> fantastic.
          </Typography>
        </div>
        <div className="map--search-container">
          {
            <MuiGeocoder
              accessToken={token}
              inputPlaceholder="Search for places"
              onSelect={(event) => console.log('select', event)}
              focusOnMount={true}
              showLoader={true}
            />
          }
        </div>
      </section>
    </div>
  )
}
