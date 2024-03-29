import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
import { Op } from 'sequelize'
const { adminChat, user, stores } = db

async function sendMessage(req, res) {
  try {
    const { senderId, receiverId, message, storeId } = req.body // Get data from the request body
    console.log(
      '🚀 ~ file: adminChat.mjs:9 ~ sendMessage ~ senderId, receiverId, message, storeId:',
      senderId,
      receiverId,
      message,
      storeId
    )

    const newMessage = await adminChat.create({
      senderId,
      receiverId,
      message,
      storeId
    })

    res.status(200).json({ data: newMessage })
  } catch (error) {
    console.error(error)
    return httpError(error.message)
  }
}

async function getAllChatListForAdmin(req, res) {
  try {
    const { storeId } = req.query

    const users = await adminChat.findAll({
      attributes: ['senderId'],

      where: {
        storeId
      },
      group: ['senderId'],
      include: [
        {
          model: user,
          as: 'sender',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'isAdmin',
            'isOnline',
            'profileImg'
          ]
        }
      ]
    })
    res.status(200).json({ data: users })
  } catch (error) {
    console.error(error)
    return httpError(error.message)
  }
}
async function getAllMessages(req, res) {
  try {
    const { userId } = req.query // Get the userId from query parameters

    const chats = await adminChat.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }]
      },
      // order: [['createdAt', 'DESC']],
      include: [{ model: user, as: 'sender' }]
    })

    res.status(200).json({ data: chats })
  } catch (error) {
    console.error(error)
    return httpError(error.message)
  }
}

async function getStoresUserStartedChatWith(req, res) {
  try {
    const { userId } = req.query

    const data = await adminChat.findAll({
      attributes: ['storeId'],
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }]
      },
      group: ['storeId'],
      include: [
        {
          model: stores,
          as: 'store',
          attributes: ['id', 'storeName', 'storeImage']
        }
      ]
    })

    res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    return httpError(error.message)
  }
}

async function getAllChatsForUserAndStore(req, res) {
  try {
    const { userId, storeId } = req.query
    console.log(
      '🚀 ~ file: adminChat.mjs:112 ~ getAllChatsForUserAndStore ~ storeId:',
      storeId
    )

    const chats = await adminChat.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, storeId },
          { receiverId: userId, storeId }
        ]
      },
      include: [
        {
          model: user,
          as: 'sender',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'isAdmin',
            'isOnline',
            'profileImg'
          ]
        },
        {
          model: stores,
          as: 'store',
          attributes: ['id', 'storeName', 'storeImage']
        }
      ]
    })

    res.status(200).json({ data: chats })
  } catch (error) {
    console.error(error)
    return httpError(error.message)
  }
}
export {
  sendMessage,
  getAllChatListForAdmin,
  getAllMessages,
  getStoresUserStartedChatWith,
  getAllChatsForUserAndStore
}
