import express from 'express'
const router = express.Router()
import {
  sendMessage,
  getAllList,
  startConversation,
  getList
} from '../controller/message.mjs'

router.get('/', getAllList)
router.get('/list', getList)
router.post('/', sendMessage)
router.post('/start', startConversation)
export default router
