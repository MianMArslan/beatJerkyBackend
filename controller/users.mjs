import db from '../models/index.js'
import _ from 'lodash'
import { httpError } from '../common/httpError.mjs'

const { user, Sequelize } = db
const Op = Sequelize.Op

async function getUser(req, res) {
  let users = await user.findAll({ where: { isDeleted: false } })
  return res.success({ data: users })
}
export { getUser }
