import auth from './auth.mjs'
import user from './users.mjs'
function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/users', user)
}

export default setRoutes
