import auth from './auth.mjs'
import user from './users.mjs'
import category from './category.mjs'
import songs from './songs.mjs'
import feed from './userFeeds.mjs'
import video from './userVideo.mjs'

function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/users', user)
  app.use('/category', category)
  app.use('/song', songs)
  app.use('/feed', feed)
  app.use('/video', video)
}

export default setRoutes
