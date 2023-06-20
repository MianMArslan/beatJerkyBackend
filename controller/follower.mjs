import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { follower } = db

async function createFollower(req, res) {
  try {
    const { followerId, userId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!followerId) throw httpError('followerId is required!')

    let record = await follower.create({
      userId,
      followerId
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
    let record = await follower.count({
      where: { userId }
    })
    let data = await follower.count({ where: { followerId: userId } })
    return res.success({ data: { following: record, follower: data } })
  } catch (error) {
    return httpError(error.message)
  }
}

async function deleteFollower(req, res) {
  try {
    const { followerId, userId } = req.query
    if (!userId) throw httpError('userId is required!')
    if (!followerId) throw httpError('followerId is required!')

    let record = await follower.destroy({ where: { userId, followerId } })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export { createFollower, getFollower, deleteFollower }
