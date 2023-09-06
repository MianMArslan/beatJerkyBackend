import express from 'express'
const router = express.Router()

import { getStoreProfile } from '../controller/storeProfile.mjs'

router.get('/', getStoreProfile)

export default router
