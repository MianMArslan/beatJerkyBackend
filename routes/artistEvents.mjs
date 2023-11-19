import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getEventByEventId
} from '../controller/artistEvent.mjs'
import { uploadArtistEventImg } from '../middleware/multer.mjs'

router.get('/events', getAllEvents)
router.get('/event/byArtistProfileId', getEventById)
router.get('/event/byEventId', getEventByEventId)

router.put(
  '/update-event',
  uploadArtistEventImg.single('eventImgStorage'),
  updateEventById
)

router.post(
  '/create-event',
  // verifyAccessToken,
  uploadArtistEventImg.single('eventImgStorage'),
  createEvent
)

router.delete(
  '/delete-event',
  // verifyAccessToken,
  deleteEventById
)

export default router
