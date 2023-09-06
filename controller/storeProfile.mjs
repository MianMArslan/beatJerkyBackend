import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'

const { stores, storeFollowers } = db

async function getStoreProfile(req, res) {
  try {
    const { storeId } = req.query

    // Use Sequelize to find the store by its ID
    const store = await stores.findByPk(storeId)

    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }

    // Use Sequelize to count store followers
    const followerCount = await storeFollowers.count({
      where: { storeId }
    })

    // Create a store profile object
    const storeProfile = {
      id: store.id,
      storeName: store.storeName,
      storeCategoryId: store.storeCategoryId,
      storeDescription: store.storeDescription,
      storeImage: store.storeImage,
      followerCount
    }

    res.status(200).json({ data: storeProfile })
  } catch (error) {
    console.error(error)
    return httpError(error.message)
  }
}

export { getStoreProfile }
