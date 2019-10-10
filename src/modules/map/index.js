import "mapbox-gl/dist/mapbox-gl.css"
import React, { Component } from 'react'
// import MapGL from "react-map-gl"
// import { GeoJsonLayer } from "deck.gl"
// import Geocoder from "react-map-gl-geocoder"

import "./index.scss"

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN

function GeocoderPlaceholder (props) {
  return (
    <div className="mapboxgl-ctrl-geocoder mapboxgl-ctrl">
      <svg className="mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-search" viewBox="0 0 18 18" width="18" height="18">
        <path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z" />
      </svg>
      <input type="text" className="mapboxgl-ctrl-geocoder--input" placeholder={props.placeholder} />
    </div>
  )
}

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
    Geocoder: GeocoderPlaceholder,
    GeoJsonLayer: null,
  }

  mapRef = React.createRef()
  containerRef = React.createRef()

  componentDidMount () {
    import('react-map-gl').then((res) => {
      this.setState({ MapGL: res.default })
    })
    import('react-map-gl-geocoder').then((res) => {
      this.setState({ Geocoder: res.default })
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
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

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
        Geocoder,
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
          <section className="map--hero hero is-fullheight">
            <div className="map--title">
              <h1 className="title has-text-white has-text-weight-bold is-size-1-tablet is-size-2-mobile">
                Life in plastic, it's <span className="is-family-secondary">NOT</span> fantastic.
              </h1>
            </div>
            <div className="map--search-results" />
            <div ref={this.containerRef} className="map--search-container">
              {
                Geocoder && (
                  <Geocoder
                    mapRef={this.mapRef}
                    onResult={this.handleOnResult}
                    onViewportChange={this.handleGeocoderViewportChange}
                    mapboxApiAccessToken={token}
                    containerRef={this.containerRef}
                    placeholder="Search for places"
                    render={(props) => {
                      return (`
                        <div>
                          ${props.text}
                        </div>
                      `)
                    }}
                  />
                )
              }
            </div>
          </section>
        </div>
      )
    }
}

export default SearchableMap
