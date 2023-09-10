import express from 'express'
const router = express.Router()
import { getAllCheckouts, createCheckout } from '../controller/checkout.mjs'

router.get('/', getAllCheckouts)

router.post('/', createCheckout)

export default router
