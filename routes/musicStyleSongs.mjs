addSong, updateSong, deleteSong, getAllSongs

import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  addSong,
  updateSong,
  deleteSong,
  getAllSongs,
  addCoverImage,
  getAllMusicStylesCategories
} from '../controller/musicStyleSongs.mjs'
import { upload } from '../middleware/multer.mjs'
import { musicStyleCoverPhotoUploadMulter } from '../middleware/musicStyleCoverPhotoUploadMulter.mjs'

router.get('/', verifyAccessToken, getAllSongs)
router.get('/all', getAllMusicStylesCategories)
router.put('/:id', verifyAccessToken, updateSong)
router.post('/', verifyAccessToken, upload.single('file'), addSong)
router.post(
  '/addCoverImage/:id',
  verifyAccessToken,
  musicStyleCoverPhotoUploadMulter.single('coverPhoto'),
  addCoverImage
)
router.delete('/:id', verifyAccessToken, deleteSong)
export default router
