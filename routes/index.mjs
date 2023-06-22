import auth from './auth.mjs'
import user from './users.mjs'
import category from './category.mjs'
import songs from './songs.mjs'
import feed from './userFeeds.mjs'
import video from './userVideo.mjs'
import follower from './follower.mjs'
import feedLike from './feedLike.mjs'
import feedComment from './feedComment.mjs'

function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/users', user)
  app.use('/category', category)
  app.use('/song', songs)
  app.use('/feed', feed)
  app.use('/video', video)
  app.use('/follower', follower)
  app.use('/feedLike', feedLike)
  app.use('/feedComment', feedComment)
}

export default setRoutes
