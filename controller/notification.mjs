import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { notification, user, role } = db

async function createNotification(req, res, next) {
  try {
    const { message, type, userId, receiverId, postId, followerId } = req.body
    if (!userId) throw httpError('userId is required!')
    if (!receiverId) throw httpError('receiverId is required!')

    let result = await notification.create({
      message,
      type,
      userId,
      receiverId,
      postId,
      followerId,
      isRead: false
    })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function getNotification(req, res, next) {
  try {
    const { userId } = req.query
    if (!userId) throw httpError('userId is required!')
    let result = await notification.findAndCountAll({
      where: { receiverId: userId },
      order: [['createdAt', 'DESC']]
    })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function updateNotificationStatus(req, res, next) {
  try {
    const { id } = req.body
    if (!id) throw httpError('id is required!')
    let result = await notification.update(
      { isRead: true },
      {
        where: { id }
      }
    )
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function deleteNotification(req, res, next) {
  try {
    const { id } = req.query
    if (!id) throw httpError('userId is required!')
    let result = await notification.destroy({
      where: { id: id }
    })
    if (result) res.success({ message: true, data: true })
  } catch (error) {
    httpError(error.message)
  }
}

export {
  createNotification,
  getNotification,
  updateNotificationStatus,
  deleteNotification
}
