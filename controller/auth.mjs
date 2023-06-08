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
      return httpError('Email Is already Exist!')
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
      where: { email: email, password: hashPassword, isAdmin }
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
  const token = getToken(email)
  const to = `${email}`
  const __dirname = path.resolve()
  const template = `${__dirname}/views/template.ejs`
  let html = await ejs.renderFile(template, {
    token: `http://localhost:3000/resetPassword?token=${token}`,
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
export { signup, login, forgotPassword, resetPassword }
