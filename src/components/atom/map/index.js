import "mapbox-gl/dist/mapbox-gl.css"
import React, { useState, useEffect, useRef } from 'react'
import { path } from 'ramda'

import Room from '@material-ui/icons/Room'

export default function Map ({
  token,
  pins = [],
  locate = false,
  setViewport = () => {},
  latitude = 0,
  longitude = 0,
  zoom = 1,
  ...rest
}) {
  const mapRef = useRef(null)
  const [isLoaded, setLoaded] = useState(false)
  const [components, setComponents] = useState([])

  const Map = path(['0'], components)
  const Locate = path(['1'], components)
  const Marker = path(['4'], components)

  useEffect(() => {
    // eslint-disable-next-line
    import('react-map-gl')
      .then(({ default: MapGL, Layer, Feature, GeolocateControl, Marker }) => {
        setComponents([MapGL, GeolocateControl, Layer, Feature, Marker])
        setLoaded(true)
      })
  }, [])

  return (
    <div style={{ backgroundColor: '#747474', position: 'relative', width: '100%', height: '100%' }}>
      {
        Map && (
          <Map
            ref={mapRef}
            latitude={latitude}
            longitude={longitude}
            zoom={zoom}
            {...rest}
            mapStyle="mapbox://styles/mapbox/light-v10"
            width="100%"
            height="100%"
            onViewportChange={(newViewport) => setViewport(newViewport)}
            mapboxApiAccessToken={token}
          >
            {
              pins.map(([longitude, latitude], i) => (
                <Marker key={i} latitude={latitude} longitude={longitude}>
                  <Room color="primary" />
                </Marker>
              ))
            }
          </Map>
        )
      }
      {
        locate && Locate && (
          <Locate
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
    </div>
  )
}
