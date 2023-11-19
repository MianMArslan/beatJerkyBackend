import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  createArtistProfile,
  getAllArtistProfiles,
  getArtistProfileById,
  updateArtistProfileById,
  deleteArtistProfileById,
  getArtistProfileProfileId
} from '../controller/artistProfile.mjs'
import { uploadArtistProfile } from '../middleware/multer.mjs'

router.get('/', getAllArtistProfiles)
router.get('/byUserId', getArtistProfileById)
router.get('/byProfileId', getArtistProfileProfileId)

router.put(
  '/update-profile',
  uploadArtistProfile.single('artistProfileStorage'),
  updateArtistProfileById
)
// router.post(
//   '/updateImage/:id',

//   uploadStoreImage.single('artistProfileStorage'),
//   createArtistProfile
// )
router.post(
  '/',
  // verifyAccessToken,
  uploadArtistProfile.single('artistProfileStorage'),
  createArtistProfile
)

router.delete(
  '/delete-artist-profile',
  //  verifyAccessToken,
  deleteArtistProfileById
)
export default router
