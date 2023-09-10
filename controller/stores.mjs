import { Op } from 'sequelize'
import db from '../models/index.js'
import { deleteFileFromDisk } from '../common/deleteFileFromDisk.mjs'
const { stores } = db

const updateStoreImage = async (req, res) => {
  try {
    const { id } = req.params

    const store = await stores.findByPk(id)

    if (!store) {
      return res.status(404).json({ error: 'Store not found' })
    }
    const previousImagePath = store.storeImage
    if (previousImagePath) await deleteFileFromDisk(previousImagePath)
    // Update the store properties
    await store.update({
      storeImage: req.file.path
    })

    res.json(store)
  } catch (error) {
    console.error('Failed to update store:', error)
    res.status(500).json({ error: 'Failed to update store' })
  }
}

const addStore = async (req, res) => {
  try {
    const { storeName, storeDescription, storeCategoryId } = req.body

    const newStore = await stores.create({
      storeName,
      storeDescription,
      storeCategoryId,
      storeImage: req.file.path
    })

    const status = 200
    const message = 'store added successfully'
    res.status(200).success({ status, message })
  } catch (error) {
    console.error('Failed to add store.........:', error)
    res.status(500).json({ error: 'Failed to add store' })
  }
}

const updateStore = async (req, res) => {
  try {
    const { id } = req.params
    const { storeName, storeDescription } = req.body

    const store = await stores.findByPk(id)

    if (!store) {
      return res.status(404).json({ error: 'Store not found' })
    }

    // Update the store properties
    await store.update({
      storeName,
      storeDescription
    })

    res.json(store)
  } catch (error) {
    console.error('Failed to update store:', error)
    res.status(500).json({ error: 'Failed to update store' })
  }
}

const deleteStore = async (req, res) => {
  try {
    const { id } = req.params

    const store = await stores.findByPk(id)

    if (!store) {
      return res.status(404).json({ error: 'store not found' })
    }

    await store.destroy()

    res.json({ message: 'store deleted successfully' })
  } catch (error) {
    console.error('Failed to delete store:', error)
    res.status(500).json({ error: 'Failed to delete store' })
  }
}

const getAllStores = async (req, res) => {
  const searchQuery = req.query.search || ''
  try {
    const allStores = await stores.findAll({
      where: { storeName: { [Op.like]: `%${searchQuery}%` } }
    })

    res.status(200).json({ stores: allStores })
  } catch (error) {
    console.error('Failed to get stores:', error)
    res.status(500).json({ error: 'Failed to get stores' })
  }
}

export { addStore, updateStore, deleteStore, getAllStores, updateStoreImage }
