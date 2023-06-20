import express from 'express'
const router = express.Router()
import { uploadFeed } from '../middleware/multer.mjs'
import {
  createFollower,
  getFollower,
  deleteFollower
} from '../controller/follower.mjs'

router.get('/', getFollower)
router.post('/', createFollower)
router.delete('/', deleteFollower)

export default router
