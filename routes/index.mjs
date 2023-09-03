import auth from './auth.mjs'
import user from './users.mjs'
import category from './category.mjs'
import songs from './songs.mjs'
import feed from './userFeeds.mjs'
import video from './userVideo.mjs'
import follower from './follower.mjs'
import storeFollowers from './storeFollowers.mjs'
import feedLike from './feedLike.mjs'
import feedComment from './feedComment.mjs'
import musicStyle from './musicStyle.mjs'
import musicStyleSongs from './musicStyleSongs.mjs'
import videoLike from './videoLike.mjs'
import videoComment from './videoComment.mjs'
import message from './message.mjs'
import storeCategory from './storeCategory.mjs'
import stores from './stores.mjs'
import products from './products.mjs'
import adminChat from './adminChat.mjs'
function setRoutes(app) {
  app.use('/auth', auth)
  app.use('/users', user)
  app.use('/category', category)
  app.use('/musicStyle', musicStyle)
  app.use('/videoLike', videoLike)
  app.use('/song', songs)
  app.use('/feed', feed)
  app.use('/video', video)
  app.use('/follower', follower)
  app.use('/storeFollowers', storeFollowers)
  app.use('/feedLike', feedLike)
  app.use('/feedComment', feedComment)
  app.use('/musicStyleSongs', musicStyleSongs)
  app.use('/videoComment', videoComment)
  app.use('/message', message)
  app.use('/storeCategory', storeCategory)
  app.use('/stores', stores)
  app.use('/products', products)
  app.use('/adminChat', adminChat)
}

export default setRoutes
