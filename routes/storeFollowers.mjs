import express from 'express'
const router = express.Router()

import {
  createFollower,
  getFollower,
  deleteFollower
} from '../controller/storeFollowers.mjs'

router.get('/', getFollower)
router.post('/', createFollower)
router.delete('/', deleteFollower)

export default router
