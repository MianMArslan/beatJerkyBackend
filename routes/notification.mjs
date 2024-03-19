import express from 'express'
import {
  createNotification,
  deleteNotification,
  getNotification,
  updateNotificationStatus
} from '../controller/notification.mjs'
const router = express.Router()

router.get('/', getNotification)
router.put('/', updateNotificationStatus)
router.post('/', createNotification)
router.delete('/', deleteNotification)
export default router
