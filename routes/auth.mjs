import express from 'express'
const router = express.Router()
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword
} from '../controller/auth.mjs'
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.put('/changePassword', verifyAccessToken, changePassword)

export default router
