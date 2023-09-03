import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { storeFollowers } = db

async function createFollower(req, res) {
  try {
    const { storeId, userId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!storeId) throw httpError('storeId is required!')
    let data = await storeFollowers.findOne({ where: { userId, storeId } })
    if (data) throw httpError('Already followed!')
    let record = await storeFollowers.create({
      userId,
      storeId
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getFollower(req, res) {
  try {
    const { userId } = req.query
    if (!userId) throw httpError('userId is required!')
    let record = await storeFollowers.findAll({
      where: { userId }
    })

    // let data = await storeFollowers.count({ where: { storeId: userId } })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function deleteFollower(req, res) {
  try {
    const { storeId, userId } = req.query
    if (!userId) throw httpError('userId is required!')
    if (!storeId) throw httpError('storeId is required!')

    let record = await storeFollowers.destroy({ where: { userId, storeId } })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export { createFollower, getFollower, deleteFollower }
