import fetch from 'isomorphic-unfetch'

const endpoint = 'https://api.mapbox.com'
const path = 'geocoding/v5/mapbox.places'

const toQueryString = (params = {}) =>
  Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

export default ({
  token,
  query,
  country,
  limit = 5,
  autocomplete = true,
}) => {
  const qParams = {
    access_token: token,
    country,
    limit,
    autocomplete,
  }

  return fetch(`${endpoint}/${path}/${encodeURIComponent(query)}.json?${toQueryString(qParams)}`)
    .then((res) => res.json()
      .then((json) => ({
        ...json,
        status: res.status,
      }))
    )
    .then((res = {}) => {
      if (res.message) {
        const err = new Error(res.message)
        err.status = res.status
        throw new Error(res.message)
      }
      return res.features
    })
}
