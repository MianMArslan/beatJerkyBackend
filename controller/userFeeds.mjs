import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
const { userFeed, user, feedLike, feedComment, stores } = db

async function createUserFeed(req, res) {
  try {
    if (!req?.file)
      throw httpError('Only (jpg|jpeg|png) files formats are allowed!')
    const { path } = req.file
    const { description, userId, storeId } = req.body

    if (!userId) throw httpError('userId is required!')
    let record = await userFeed.create({
      userId,
      imageUrl: path,
      description,
      storeId
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

async function getUserFeed(req, res) {
  try {
    const { userId } = req.query
    let value = []
    if (!userId) throw httpError('userId is required!')
    let record = await userFeed.findAll({
      where: { isDeleted: false, userId },
      include: [{ model: feedLike }, { model: feedComment }]
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
async function getStoreFeed(req, res) {
  try {
    const { storeId } = req.query
    console.log(
      '🚀 ~ file: userFeeds.mjs:42 ~ getStoreFeed ~ storeId:',
      storeId
    )
    let value = []
    if (!storeId) throw httpError('storeId is required!')
    let records = await userFeed.findAll({
      where: { isDeleted: false, storeId },
      include: [{ model: feedLike }, { model: feedComment }]
    })
    return res.success({ data: records })
  } catch (error) {
    return httpError(error.message)
  }
}
async function deleteStoreFeed(req, res) {
  try {
    const { storeId } = req.query
    if (!storeId) throw httpError('storeId is required!')
    const deletedCount = await userFeed.update(
      { isDeleted: true },
      { where: { storeId, isDeleted: false } }
    )
    return res.success({
      message: `Deleted ${deletedCount} records for storeId ${storeId}`
    })
  } catch (error) {
    return httpError(error.message)
  }
}

// async function getAllUserFeed(req, res) {
//   try {
//     const { limit, offset } = req.query
//     let object = {
//       where: { isDeleted: false },
//       order: [['createdAt', 'DESC']],
//       include: [
//         { model: user, attributes: ['firstName', 'lastName'] },
//         { model: feedLike },
//         { model: feedComment }
//       ]
//     }
//     if (limit) object.limit = Number(limit)
//     if (offset || offset == 0) object.offset = Number(offset)
//     let record = await userFeed.findAll(object)
//     return res.success({ data: record })
//   } catch (error) {
//     return httpError(error.message)
//   }
// }
//above is the previous implementation
async function getAllUserFeed(req, res) {
  try {
    const { limit, offset } = req.query
    let object = {
      where: { isDeleted: false },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: user,
          attributes: ['firstName', 'lastName', 'profileImg']
        },
        { model: feedLike },
        { model: feedComment }
      ]
    }

    if (object.include && object.include.length > 0) {
      object.include.push({
        model: stores,
        attributes: ['storeName', 'storeDescription'] // Replace with actual attributes
      })
    }

    if (limit) object.limit = Number(limit)
    if (offset || offset == 0) object.offset = Number(offset)

    let records = await userFeed.findAll(object)
    return res.success({ data: records })
  } catch (error) {
    return httpError(error.message)
  }
}

async function deleteUserFeed(req, res) {
  try {
    const { feedId, userId } = req.query
    if (!userId) throw httpError('userId is required!')

    let record = await userFeed.update(
      { isDeleted: true },
      { where: { userId, id: feedId } }
    )
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}
export {
  createUserFeed,
  getAllUserFeed,
  getUserFeed,
  deleteUserFeed,
  getStoreFeed,
  deleteStoreFeed
}
