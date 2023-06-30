import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  deleteSpecificMusicStyle,
  createMusicStyle,
  updateSpecificMusicStyle,
  getAllMusicStyle,
  getAllMusicStyleWithSongs
} from '../controller/musicStyle.mjs'

router.get('/', verifyAccessToken, getAllMusicStyle)
router.get('/getAllMusicStylesWithSongs',  getAllMusicStyleWithSongs)


router.put('/:MusicStyleId', verifyAccessToken, updateSpecificMusicStyle)
router.post('/createMusicStyle', verifyAccessToken, createMusicStyle)

router.delete('/:musicStyleId', verifyAccessToken, deleteSpecificMusicStyle)
export default router

