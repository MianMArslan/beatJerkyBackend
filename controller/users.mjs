import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'
import { deleteFileFromDisk } from '../common/deleteFileFromDisk.mjs'
const { user, Sequelize } = db
const Op = Sequelize.Op
async function getAdminUser(req, res) {
  try {
    const response = await user.findAll({
      where: {
        isAdmin: true
      }
    })
    return res.success({ data: response })
  } catch (error) {
    return httpError(error.message)
  }
}
async function getUser(req, res) {
  const searchQuery = req.query.search || ''

  try {
    let users
    if (searchQuery.includes(' ')) {
      const [firstName, lastName] = searchQuery.split(' ')

      users = await user.findAll({
        where: {
          isAdmin: false,
          [Op.or]: [
            { firstName: { [Op.like]: `%${firstName}%` } },
            { lastName: { [Op.like]: `%${lastName}%` } }
          ]
        }
      })
    } else {
      users = await user.findAll({
        where: {
          isAdmin: false,
          [Op.or]: [
            { firstName: { [Op.like]: `%${searchQuery}%` } },
            { lastName: { [Op.like]: `%${searchQuery}%` } }
          ]
        }
      })
    }

    return res.success({ data: users })
  } catch (error) {
    return httpError(error.message)
  }
}

const updateIsDeleted = async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) throw httpError('userId is required!')
    await user.update({ isDeleted: true }, { where: { id: userId } })
    return res.status(200).success({ message: 'successfully deleted' })
  } catch (error) {
    res.status(400).json({ error: 'Failed to update isDeleted' })
  }
}

async function updateUserProfile(req, res) {
  try {
    if (!req?.file)
      throw httpError('Only (jpg|jpeg|png) files formats are allowed!')
    const { path } = req.file
    const { userId } = req.body
    if (!userId) throw httpError('userId is required!')
    let img = await user.findOne({ where: { id: userId } })
    console.log(img)
    if (img.profileImg) await deleteFileFromDisk(img.profileImg)
    let users = await user.update(
      { profileImg: path },
      { where: { id: userId } }
    )
    return res.success({ data: users })
  } catch (error) {
    return httpError(error.message)
  }
}

async function getCurrentUser(req, res) {
  try {
    const { userId } = req.query
    if (!userId) throw httpError('userId is required!')
    let users = await user.findAll({
      where: { id: userId },
      attributes: ['firstName', 'lastName', 'profileImg', 'email']
    })
    return res.success({ data: users })
  } catch (error) {
    return httpError(error.message)
  }
}
export {
  getUser,
  updateUserProfile,
  updateIsDeleted,
  getCurrentUser,
  getAdminUser
}
