import express from 'express'
const router = express.Router()
import { uploadFeed } from '../middleware/multer.mjs'
import { authorizeUser } from '../common/token.mjs'
import {
  createUserFeed,
  getAllUserFeed,
  getUserFeed
} from '../controller/userFeeds.mjs'

router.get('/', getUserFeed)
router.get('/all', getAllUserFeed)
router.post('/', uploadFeed.single('feed'), createUserFeed)

export default router
