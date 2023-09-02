import express from 'express'
const router = express.Router()
import {
  sendMessage,
  getAllChatListForAdmin,
  getAllMessages
} from '../controller/adminChat.mjs'

router.get('/', getAllChatListForAdmin)
router.get('/messages', getAllMessages)
router.post('/', sendMessage)
// router.post('/start', startConversation)
export default router
