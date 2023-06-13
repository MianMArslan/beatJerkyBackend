import auth from './auth.mjs'
import user from './users.mjs'
import category from './category.mjs'
import songs from './songs.mjs'
import feed from './userFeeds.mjs'

function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/users', user)
  app.use('/category', category)
  app.use('/songs', songs)
  app.use('/feed', feed)
}

export default setRoutes
