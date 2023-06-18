import express from 'express'
const router = express.Router()

import { getUser ,updateIsDeleted} from '../controller/users.mjs'

router.get('/', getUser)
router.put('/:id', updateIsDeleted)
 

export default router
