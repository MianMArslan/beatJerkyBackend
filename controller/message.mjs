import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
import { Op } from 'sequelize'
const { message, user, conversation } = db

async function startConversation(req, res) {
  try {
    let value = await conversation.create({ isDeleted: false })
    res.status(200).json({ data: value })
  } catch (error) {
    throw httpError(error.message)
  }
}
async function sendMessage(req, res) {
  try {
    const { senderId, receiverId, text, conversationId } = req.body
    if (!senderId) throw httpError('senderId is required!')
    if (!receiverId) throw httpError('receiverId is required!')
    if (!conversationId) throw httpError('conversationId is required!')

    let value = await message.create({
      senderId: senderId,
      receiverId: receiverId,
      message: text,
      conversationId
    })
    res.status(200).json({ data: value })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getAllList(req, res) {
  try {
    const { conversationId } = req.query
    if (!conversationId) throw httpError('userId is required!')
    let value = await message.findAll({
      where: {
        conversationId
      }
    })
    res.status(200).json({ data: value })
  } catch (error) {
    return httpError(error.message)
  }
}
async function getList(req, res) {
  try {
    const { userId } = req.query
    if (!userId) throw httpError('userId is required!')
    let value = await message.findAll({
      where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
      order: [['createdAt', 'DESC']],
      group: ['conversationId'],
      include: [
        {
          model: user,
          as: 'sender',
          attributes: [
            'firstName',
            'lastName',
            'profileImg',
            'isOnline',
            'lastOnline'
          ]
        },
        {
          model: user,
          as: 'receiver',
          attributes: [
            'firstName',
            'lastName',
            'profileImg',
            'isOnline',
            'lastOnline'
          ]
        }
      ]
    })
    res.status(200).json({ data: value })
  } catch (error) {
    return httpError(error.message)
  }
}
export { sendMessage, getAllList, startConversation, getList }
