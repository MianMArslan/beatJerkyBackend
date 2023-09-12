import express from 'express'
const router = express.Router()
import {
  getAllCheckouts,
  createCheckout,
  updateOrderStatus
} from '../controller/checkout.mjs'

router.get('/', getAllCheckouts)
router.put(
  '/',
  (req, res, next) => {
    console.log('🚀 ~ file: checkout.mjs:11 ~ router.put ~ req:', req)
    next()
  },
  updateOrderStatus
)

router.post('/', createCheckout)

export default router
