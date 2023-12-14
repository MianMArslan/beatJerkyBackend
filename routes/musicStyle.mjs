import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  deleteSpecificMusicStyle,
  createMusicStyle,
  updateSpecificMusicStyle,
  getAllMusicStyle,
  getAllMusicStyleWithSongs,
  getAllMusicStyleFromUser,
  getMusicStyleById
} from '../controller/musicStyle.mjs'

router.get('/', verifyAccessToken, getAllMusicStyle)
router.get('/byId', verifyAccessToken, getMusicStyleById)

router.get('/getAllMusicStylesWithSongs', getAllMusicStyleWithSongs)
router.get('/all', getAllMusicStyleFromUser)

router.put('/:MusicStyleId', verifyAccessToken, updateSpecificMusicStyle)
router.post('/createMusicStyle', verifyAccessToken, createMusicStyle)

router.delete('/:musicStyleId', verifyAccessToken, deleteSpecificMusicStyle)
export default router
