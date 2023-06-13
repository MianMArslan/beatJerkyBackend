import db from '../models/index.js'
import _ from 'lodash'
import { httpError } from '../common/httpError.mjs'

const { user, Sequelize } = db
const Op = Sequelize.Op

async function getUser(req, res) {
  try {
    let users = await user.findAll({ where: { isAdmin: false } })
    return res.success({ data: users })
  } catch (error) {
    return httpError(error.message)
  }
}
export { getUser }
