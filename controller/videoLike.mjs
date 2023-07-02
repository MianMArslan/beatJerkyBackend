import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { videoLike, user } = db

async function createVideoLike(req, res) {
  try {
    const { videoId, userId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!videoId) throw httpError('videoId is required!')
    let record = await videoLike.create({
      videoId,
      userId
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getVideoLike(req, res) {
  try {
    const { userId, videoId } = req.query
    if (!userId) throw httpError('userId is required!')
    if (!videoId) throw httpError('videoId is required!')

    let record = await videoLike.count({
      where: { userId, videoId }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAllVideoLike(req, res) {
  try {
    const { videoId } = req.query
    if (!videoId) throw httpError('videoId is required!')

    let record = await videoLike.findAll({
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

async function deleteVideoLike(req, res) {
  try {
    const { videoId, userId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!videoId) throw httpError('videoId is required!')
    let record = await videoLike.destroy({
      where: {
        videoId,
        userId
      }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export { createVideoLike, getVideoLike, getAllVideoLike, deleteVideoLike }
