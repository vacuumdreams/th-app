const middlewares = []

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  middlewares.push(createLogger({}))
}

export default middlewares
