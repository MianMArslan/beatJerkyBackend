import express from 'express'
const router = express.Router()
import {
  createVideoLike,
  getVideoLike,
  getAllVideoLike,
  deleteVideoLike
} from '../controller/videoLike.mjs'

router.get('/', getVideoLike)
router.get('/all', getAllVideoLike)
router.post('/', createVideoLike)
router.delete('/', deleteVideoLike)

export default router
