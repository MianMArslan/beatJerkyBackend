import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { feedComment, user } = db

async function createFeedComment(req, res) {
  try {
    const { feedId, userId, comment } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!feedId) throw httpError('feedId is required!')
    let record = await feedComment.create({
      feedId,
      userId,
      comment
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getFeedComment(req, res) {
  try {
    const { userId, feedId } = req.query
    if (!userId) throw httpError('userId is required!')
    if (!feedId) throw httpError('feedId is required!')

    let record = await feedComment.count({
      where: { userId, feedId }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAllFeedComment(req, res) {
  try {
    const { feedId } = req.query
    if (!feedId) throw httpError('feedId is required!')

    let record = await feedComment.findAll({
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

async function deleteFeedComment(req, res) {
  try {
    const { feedId, userId, commentId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!feedId) throw httpError('feedId is required!')
    let record = await feedComment.destroy({
      where: {
        feedId,
        userId,
        id: commentId
      }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export {
  createFeedComment,
  getFeedComment,
  getAllFeedComment,
  deleteFeedComment
}
