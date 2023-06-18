import express from 'express'
const router = express.Router()
import { uploadFeed } from '../middleware/multer.mjs'
import {
  createUserFeed,
  getAllUserFeed,
  getUserFeed,
  deleteUserFeed
} from '../controller/userFeeds.mjs'

router.get('/', getUserFeed)
router.get('/all', getAllUserFeed)
router.post('/', uploadFeed.single('feed'), createUserFeed)
router.delete('/', deleteUserFeed)

export default router
