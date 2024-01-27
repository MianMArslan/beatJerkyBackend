import express from 'express'
const router = express.Router()
import { uploadProfile } from '../middleware/multer.mjs'
import {
  getUser,
  updateIsDeleted,
  updateUserProfile,
  getCurrentUser,
  getAdminUser,
  blockUser,
  unblockUser
} from '../controller/users.mjs'

router.get('/', getUser)
router.post('/block-user', blockUser)
router.delete('/unblock-user', unblockUser)

router.get('/getAdminUser', getAdminUser)
router.get('/current', getCurrentUser)
router.put('/profileImg', uploadProfile.single('file'), updateUserProfile)
router.delete('/', updateIsDeleted)

export default router
