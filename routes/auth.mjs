import express from 'express'
const router = express.Router()
import {
  signup,
  login,
  forgotPassword,
  resetPassword
} from '../controller/auth.mjs'

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

export default router
