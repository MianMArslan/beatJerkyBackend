import express from 'express'
const router = express.Router()
import {
  createFeedLike,
  getFeedLike,
  getAllFeedLike,
  deleteFeedLike
} from '../controller/feedLike.mjs'

router.get('/', getFeedLike)
router.get('/all', getAllFeedLike)
router.post('/', createFeedLike)
router.delete('/', deleteFeedLike)

export default router
