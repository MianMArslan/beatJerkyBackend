import express from 'express'
const router = express.Router()
import { uploadFeed } from '../middleware/multer.mjs'
import { authorizeUser } from '../common/token.mjs'
import {
  createUserFeed,
  getAllUserFeed,
  getUserFeed
} from '../controller/userFeeds.mjs'

router.get('/', authorizeUser, getUserFeed)
router.get('/all', authorizeUser, getAllUserFeed)
router.post('/', authorizeUser, uploadFeed.single('feed'), createUserFeed)

export default router
