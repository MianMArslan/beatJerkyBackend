import express from 'express'
const router = express.Router()
import {
  createVideoComment,
  getVideoComment,
  getAllVideoComment,
  deleteVideoComment
} from '../controller/videoComment.mjs'

router.get('/', getVideoComment)
router.get('/all', getAllVideoComment)
router.post('/', createVideoComment)
router.delete('/', deleteVideoComment)

export default router
