import express from 'express'
const router = express.Router()
import { uploadProfile } from '../middleware/multer.mjs'
import {
  getUser,
  updateIsDeleted,
  updateUserProfile,
  getCurrentUser
} from '../controller/users.mjs'

router.get('/', getUser)
router.get('/current', getCurrentUser)
router.put('/profileImg', uploadProfile.single('file'), updateUserProfile)
router.put('/:id', updateIsDeleted)

export default router
