import express from 'express'
const router = express.Router()
import { uploadFeed } from '../middleware/multer.mjs'
import {
  createUserFeed,
  getAllUserFeed,
  getUserFeed,
  deleteUserFeed,
  getStoreFeed,
  deleteStoreFeed,
  getAllUserFeedByClientId
} from '../controller/userFeeds.mjs'

router.get('/', getUserFeed)

router.get('/user-feed-by-client-id', getAllUserFeedByClientId)
router.get('/all', getAllUserFeed)
router.get('/storeFeed', getStoreFeed)
router.post('/', uploadFeed.single('feed'), createUserFeed)
router.delete('/', deleteUserFeed)
router.delete('/storeFeed', deleteStoreFeed)

export default router
