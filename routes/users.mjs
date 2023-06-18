import express from 'express'
const router = express.Router()
import { uploadProfile } from '../middleware/multer.mjs'
import {
  getUser,
  updateIsDeleted,
  updateUserProfile
} from '../controller/users.mjs'

router.get('/', getUser)
router.put('/profileImg', uploadProfile.single('file'), updateUserProfile)
router.put('/:id', updateIsDeleted)

export default router
