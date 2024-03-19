import bcrypt from 'bcrypt'
import db from '../models/index.js'
import _ from 'lodash'
import { accessToken } from '../common/token.mjs'
import { httpError } from '../common/httpError.mjs'
import { getToken } from '../common/token.mjs'
import sendEmail from '../common/mailer.mjs'
import jwtDecode from 'jwt-decode'
import ejs from 'ejs'
import path from 'path'
const { user, sequelize } = db

async function signup(req, res) {
  const { firstName, lastName, email, password } = req.body
  let hashPassword
  const t = await sequelize.transaction()
  try {
    const checker = await user.findOne({ where: { email } })
    if (_.isEmpty(checker)) {
      hashPassword = await bcrypt.hash(password, process.env.SALT)
      const record = await user.create(
        {
          firstName,
          lastName,
          email,
          password: hashPassword,
          isAdmin: false
        },
        { transaction: t }
      )
      await t.commit()
      const status = 200
      const message = 'Your account has been created successfully!'
      return res.status(200).success({ status, message })
    } else {
      return httpError(
        'Email Is already Exist please contact support if you need any assistance!'
      )
    }
  } catch (error) {
    await t.rollback()
    return res.fail({ error })
  }
}

async function login(req, res) {
  const { email, password, isAdmin } = req.body

  let userData = {}
  try {
    let hashPassword = await bcrypt.hash(password, process.env.SALT)
    const record = await user.findOne({
      where: { email: email, password: hashPassword, isAdmin, isDeleted: 0 }
    })
    if (!record)
      return res.fail({ error: { message: 'Email or password is invalid!' } })

    userData = {
      userId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      admin: record.isAdmin
    }

    const token = await accessToken(userData)
    res.cookie('accessToken', token)
    await user.update(
      { lastOnline: new Date(), isOnline: true },
      {
        where: { email: email, password: hashPassword, isAdmin }
      }
    )

    return res.success({
      status: 200,
      message: 'Successfully login!',
      data: userData
    })
  } catch (error) {
    return res.error({ error })
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body
  const verify = await user.findOne({ where: { email } })
  if (!verify) {
    return httpError('Email is not exist in system!')
  } else if (verify?.isDeleted == 1) {
    return httpError('This account has been deleted!')
  } else {
    const token = getToken(email)
    const to = `${email}`
    const __dirname = path.resolve()
    const template = `${__dirname}/views/template.ejs`
    let html = await ejs.renderFile(template, {
      token: `http://beatjerky.com/resetPassword?token=${token}`,
      name: email,
      user: 'We receive your request to Reset Password.',
      header: 'Trouble signing in?',
      buttonText: `Reset Password`,
      footer: `You received this email because you requested to create account. If you did not,please contact`
    })
    try {
      await sendEmail(to, 'Reset Password', html)
      return res.success({
        message: 'Kindly check your email!'
      })
    } catch (err) {
      return res.error({ error: err })
    }
  }
}

async function resetPassword(req, res) {
  const { token, password } = req.body
  const decode = jwtDecode(token)
  try {
    const hashPassword = await bcrypt.hash(password, process.env.SALT)
    const verify = await user.update(
      { password: hashPassword },
      { where: { email: decode.email } }
    )
    if (_.isEmpty(verify))
      return httpError('Error occur while updating password')
    return res.success({
      status: 200,
      message: 'Password reset successfully',
      data: null
    })
  } catch (err) {
    return httpError('Error occur while updating password')
  }
}

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body

  if (!userId) throw httpError('userId is required!')

  try {
    // Find the user by ID
    const currentUser = await user.findOne({ where: { id: userId } })
    if (!currentUser) {
      return res.status(404).json({ message: 'currentUser not found' })
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, currentUser.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid current password' })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, process.env.SALT)

    // Update the currentUser's password
    await user.update({ password: hashedPassword }, { where: { id: userId } })
    // Generate a new JWT token with updated user data
    // const userData = {
    //   userId: req.user.userId,
    //   firstName: req.user.firstName,
    //   lastName: req.user.lastName,
    //   email: req.user.email,
    //   admin: req.user.isAdmin
    // }
    // const token = await accessToken(userData)
    // res.cookie('accessToken', token)

    return res.success({
      status: 200,
      message: 'Successfully Change Password!'
      // data: userData
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred while changing the password', error })
  }
}
async function logout(req, res) {
  const { userId } = req.body
  if (!userId) throw httpError('userId is required!')
  try {
    res.clearCookie('accessToken')

    await user.update(
      { isOnline: false },
      {
        where: { id: userId }
      }
    )

    return res.success({
      status: 200,
      message: 'Successfully logout!',
      data: userData
    })
  } catch (error) {
    return res.error({ error })
  }
}
export { signup, login, forgotPassword, resetPassword, changePassword, logout }
