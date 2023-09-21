import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { userVideo, user, videoLike, videoComment } = db

async function createVideo(req, res) {
  try {
    if (!req?.file)
      throw httpError('Only (jpg|jpeg|png) files formats are allowed!')
    const { path } = req.file
    const { description, userId } = req.body
    if (!userId) throw httpError('userId is required!')
    let record = await userVideo.create({
      userId,
      videoUrl: path,
      description
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}
async function getUserVideo(req, res) {
  try {
    const { userId } = req.query

    if (!userId) throw httpError('userId is required!')
    let record = await userVideo.findAll({
      where: { isDeleted: false, userId },
      include: [{ model: videoLike }, { model: videoComment }]
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getAllUserVideo(req, res) {
  try {
    const { limit, offset } = req.query
    let object = {
      where: { isDeleted: false },
      order: [['createdAt', 'DESC']],
      include: [
        { model: user, attributes: ['firstName', 'lastName', 'profileImg'] },
        { model: videoLike },
        { model: videoComment }
      ]
    }
    if (limit) object.limit = Number(limit)
    if (offset || offset == 0) object.offset = Number(offset)
    let record = await userVideo.findAll(object)
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
async function deleteUserVideo(req, res) {
  try {
    const { videoId, userId } = req.query
    if (!userId) throw httpError('userId is required!')

    let record = await userVideo.update(
      { isDeleted: true },
      { where: { userId, id: videoId } }
    )
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export { createVideo, getAllUserVideo, getUserVideo, deleteUserVideo }
