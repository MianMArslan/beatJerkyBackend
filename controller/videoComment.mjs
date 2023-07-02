import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { videoComment, user } = db

async function createVideoComment(req, res) {
  try {
    const { videoId, userId, comment } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!videoId) throw httpError('videoId is required!')
    let record = await videoComment.create({
      videoId,
      userId,
      comment
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getVideoComment(req, res) {
  try {
    const { userId, videoId } = req.query
    if (!userId) throw httpError('userId is required!')
    if (!videoId) throw httpError('videoId is required!')

    let record = await videoComment.count({
      where: { userId, videoId }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAllVideoComment(req, res) {
  try {
    const { videoId } = req.query
    if (!videoId) throw httpError('videoId is required!')

    let record = await videoComment.findAll({
      where: { videoId },
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

async function deleteVideoComment(req, res) {
  try {
    const { videoId, userId, commentId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!videoId) throw httpError('videoId is required!')
    let record = await videoComment.destroy({
      where: {
        videoId,
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
  createVideoComment,
  getVideoComment,
  getAllVideoComment,
  deleteVideoComment
}
