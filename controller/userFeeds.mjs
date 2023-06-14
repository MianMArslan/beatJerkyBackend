import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { userFeed, user } = db

async function createUserFeed(req, res) {
  try {
    if (!req?.file)
      throw httpError('Only (jpg|jpeg|png) files formats are allowed!')
    const { path } = req.file
    const { description } = req.body
    const { id } = req.session.dataValues
    let record = await userFeed.create({
      userId: id,
      imageUrl: path,
      description
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getUserFeed(req, res) {
  try {
    const { id } = req.session.dataValues
    let record = await userFeed.findAll({
      where: { isDeleted: false, userId: id }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAllUserFeed(req, res) {
  try {
    const { limit, offset } = req.query
    let object = {
      where: { isDeleted: false },
      order: [['createdAt', 'DESC']],
      include: [{ model: user, attributes: ['firstName', 'lastName'] }]
    }
    if (limit) object.limit = Number(limit)
    if (offset || offset == 0) object.offset = Number(offset)
    let record = await userFeed.findAll(object)
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export { createUserFeed, getAllUserFeed, getUserFeed }
