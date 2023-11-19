import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSongById,
  deleteSongById,
  getSongsByArtistId
} from '../controller/artistSongs.mjs'
import { uploadArtistSongImgAndSong } from '../middleware/multer.mjs'

router.get('/', getAllSongs)
router.get('/byId', getSongById)
router.get('/byArtistId', getSongsByArtistId)

router.put(
  '/update-song',
  uploadArtistSongImgAndSong.fields([
    { name: 'artistSongsStorage', maxCount: 1 },
    { name: 'artistSongCoverImgStorage', maxCount: 1 }
  ]),
  updateSongById
)

router.post(
  '/',
  // verifyAccessToken,

  uploadArtistSongImgAndSong.fields([
    { name: 'artistSongsStorage', maxCount: 1 },
    { name: 'artistSongCoverImgStorage', maxCount: 1 }
  ]),

  createSong
)

router.delete(
  '/delete-song',
  //  verifyAccessToken,
  deleteSongById
)
export default router
