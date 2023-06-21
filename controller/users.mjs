import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'
import { deleteFileFromDisk } from '../common/deleteFileFromDisk.mjs'
const { user, Sequelize } = db
const Op = Sequelize.Op

async function getUser(req, res) {
  try {
    let users = await user.findAll({ where: { isAdmin: false } })
    return res.success({ data: users })
  } catch (error) {
    return httpError(error.message)
  }
}

// Assuming you have imported the necessary dependencies and initialized the database models

const updateIsDeleted = async (req, res) => {
  try {
    const { id } = req.params
    const { isDeleted } = req.body
    console.log(
      '🚀🚀🚀🚀🚀 ~ file: users.mjs:23 ~ updateIsDeleted ~ isDeleted:',
      req.body
    )

    // Find the record by ID
    const record = await user.findByPk(id)

    if (!record) {
      // Return an error if the record is not found
      return res.status(404).json({ error: 'Record not found' })
    }

    // Update the isDeleted key with the new value
    record.isDeleted = isDeleted

    // Save the updated record to the database
    await record.save()

    // Return the updated record
    const status = 200
    const message = 'Updated User Status'
    return res.status(200).success({ status, message })
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Failed to update isDeleted:', error)
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
export { getUser, updateUserProfile, updateIsDeleted, getCurrentUser }
