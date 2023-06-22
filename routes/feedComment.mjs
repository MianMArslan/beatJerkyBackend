import express from 'express'
const router = express.Router()
import {
  createFeedComment,
  getFeedComment,
  getAllFeedComment,
  deleteFeedComment
} from '../controller/feedComment.mjs'

router.get('/', getFeedComment)
router.get('/all', getAllFeedComment)
router.post('/', createFeedComment)
router.delete('/', deleteFeedComment)

export default router
