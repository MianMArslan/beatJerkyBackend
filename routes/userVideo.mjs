import express from 'express'
const router = express.Router()
import { uploadVideo } from '../middleware/multer.mjs'
import {
  createVideo,
  getUserVideo,
  getAllUserVideo,
  deleteUserVideo
} from '../controller/userVideo.mjs'

router.get('/', getUserVideo)
router.get('/all', getAllUserVideo)
router.post('/', uploadVideo.single('file'), createVideo)
router.delete('/', deleteUserVideo)
export default router
