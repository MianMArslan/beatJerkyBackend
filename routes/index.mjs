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
import storeProfile from './storeProfile.mjs'
import checkout from './checkout.mjs'
import artistProfile from './artistProfile.mjs'
import artistSongs from './artistSongs.mjs'
import events from './artistEvents.mjs'
import notification from './notification.mjs'

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
  app.use('/storeProfile', storeProfile)
  app.use('/products', products)
  app.use('/adminChat', adminChat)
  app.use('/checkout', checkout)
  app.use('/artist-profile', artistProfile)
  app.use('/artist-songs', artistSongs)
  app.use('/artist-events', events)
  app.use('/notification', notification)
}

export default setRoutes
