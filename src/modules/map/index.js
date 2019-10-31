import "mapbox-gl/dist/mapbox-gl.css"
import React, { Component } from 'react'

import MuiGeocoder from 'react-mui-mapbox-geocoder'
import Typography from '@material-ui/core/Typography'
// import MapGL from "react-map-gl"
// import { GeoJsonLayer } from "deck.gl"

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

class SearchableMap extends Component {
  state = {
    searched: false,
    viewport :{
      latitude: 0,
      longitude: 0,
      zoom: 1
    },
    searchResultLayer: null,
    MapGL: null,
    GeoJsonLayer: null,
    GeolocateControl: null,
  }

  mapRef = React.createRef()
  containerRef = React.createRef()

  componentDidMount () {
    import('react-map-gl').then((res) => {
      this.setState({
        MapGL: res.default,
        GeolocateControl: res.GeolocateControl,
      })
    })
    import('deck.gl').then((res) => {
      this.setState({ GeoJsonLayer: res.GeoJsonLayer })
    })
  }

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleOnResult = (event) => {
    const { GeoJsonLayer } = this.state
    if (GeoJsonLayer) {
      this.setState({
        searched: true,
        searchResultLayer: new GeoJsonLayer({
          id: "search-result",
          data: event.result.geometry,
          getFillColor: [255, 0, 0, 128],
          getRadius: 1000,
          pointRadiusMinPixels: 10,
          pointRadiusMaxPixels: 10,
        })
      })
    }
  }

    render () {
      const {
        searched,
        viewport,
        MapGL,
        GeolocateControl,
      } = this.state

      return (
        <div className={`${searched ? 'map--searched' : 'map'}`}>
          <div className="map--item">
            {
              MapGL && (
                <MapGL
                  ref={this.mapRef}
                  {...viewport}
                  mapStyle="mapbox://styles/mapbox/light-v10"
                  width="100%"
                  height="100%"
                  onViewportChange={this.handleViewportChange}
                  mapboxApiAccessToken={token}
                />
              )
            }
          </div>
          <section className="">
            <div className="map--title">
              <Typography variant="h1">
                Life in plastic,<br /> it's <span className="is-family-secondary">NOT</span> fantastic.
              </Typography>
            </div>
            <div ref={this.containerRef} className="map--search-container">
              {
                <MuiGeocoder
                  accessToken={token}
                  inputPlaceholder="Search for places"
                  onSelect={() => console.log('select')}
                  focusOnMount={true}
                  showLoader={true}
                />
              }
            </div>
            {
              GeolocateControl && (
                <GeolocateControl
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                  }}
                  positionOptions={{enableHighAccuracy: true}}
                  trackUserLocation={true}
                />
              )
            }
          </section>
        </div>
      )
    }
}

export default SearchableMap
