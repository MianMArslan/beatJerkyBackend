import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  addStore,
  updateStore,
  deleteStore,
  getAllStores
  // addCoverImage
} from '../controller/stores.mjs'
import { uploadStoreImage } from '../middleware/multer.mjs'

router.get('/', getAllStores)
router.put('/:id', updateStore)
router.post(
  '/',
  verifyAccessToken,
  uploadStoreImage.single('storeImage'),
  addStore
)
// router.post(
//   '/addCoverImage/:id',
//   verifyAccessToken,
//   coverPhotoUpload.single('coverPhoto'),
//   addCoverImage
// )
router.delete('/:id', verifyAccessToken, deleteStore)
export default router
