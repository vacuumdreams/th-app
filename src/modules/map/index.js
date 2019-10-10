import "mapbox-gl/dist/mapbox-gl.css"
import React, { Component } from 'react'
// import MapGL from "react-map-gl"
// import { GeoJsonLayer } from "deck.gl"
// import Geocoder from "react-map-gl-geocoder"

import "./index.scss"

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
    Geocoder: null,
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
        GeoJsonLayer,
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
                      console.log(props)
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
