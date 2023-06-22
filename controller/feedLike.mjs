import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { feedLike, user } = db

async function createFeedLike(req, res) {
  try {
    const { feedId, userId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!feedId) throw httpError('feedId is required!')
    let record = await feedLike.create({
      feedId,
      userId
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getFeedLike(req, res) {
  try {
    const { userId, feedId } = req.query
    if (!userId) throw httpError('userId is required!')
    if (!feedId) throw httpError('feedId is required!')

    let record = await feedLike.count({
      where: { userId, feedId }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAllFeedLike(req, res) {
  try {
    const { feedId } = req.query
    if (!feedId) throw httpError('feedId is required!')

    let record = await feedLike.findAll({
      where: { feedId },
      order: [['createdAt', 'DESC']],
      include: [
        { model: user, attributes: ['firstName', 'lastName', 'profileImg'] }
      ]
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function deleteFeedLike(req, res) {
  try {
    const { feedId, userId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!feedId) throw httpError('feedId is required!')
    let record = await feedLike.destroy({
      where: {
        feedId,
        userId
      }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export { createFeedLike, getFeedLike, getAllFeedLike, deleteFeedLike }
