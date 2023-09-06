import express from 'express'
const router = express.Router()
import {
  sendMessage,
  getAllChatListForAdmin,
  getAllMessages,
  getStoresUserStartedChatWith,
  getAllChatsForUserAndStore
} from '../controller/adminChat.mjs'

router.get('/', getAllChatListForAdmin)
router.get('/getChatListWithStores', getStoresUserStartedChatWith)
router.get('/messages', getAllMessages)
router.get('/fetchChatWithStore', getAllChatsForUserAndStore)
router.post('/', sendMessage)
// router.post('/start', startConversation)
export default router
