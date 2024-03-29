import { Op } from 'sequelize'
import db from '../models/index.js'
const { products, stores } = db

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productDiscount,
      productPrice,
      storeId
    } = req.body
    const store = await stores.findByPk(storeId) //first we will check k store ha k nai

    if (!store) {
      return res.status(404).json({ error: 'store not found' })
    }
    const newStore = await products.create({
      productName,
      productDescription,
      productDiscount,
      productPrice,
      storeId,
      productImg1: req.files[0]?.path,
      productImg2: req.files[1]?.path,
      productImg3: req.files[2]?.path,
      productImg4: req.files[3]?.path
    })

    const status = 200
    const message = 'product added successfully'
    res.status(200).success({ status, message })
  } catch (error) {
    console.error('Failed to add store.........:', error)
    res.status(500).json({ error: 'Failed to add store' })
  }
}

const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productDiscount,
      productPrice,
      storeId,
      productId
    } = req.body

    console.log(
      '🚀 ~ file: products.mjs:50 ~ updateProduct ~   productName',
      productDescription,
      productDiscount,
      productPrice,
      storeId,
      productId,
      productName
    )

    if (!productId || !storeId) {
      return res
        .status(400)
        .json({ error: 'Both productId and storeId are required' })
    }

    const product = await products.findByPk(productId)

    if (!product || product.storeId !== storeId) {
      return res.status(404).json({
        error: 'Product not found for the given storeId and productId'
      })
    }

    product.productName = productName
    product.productDiscount = productDiscount
    product.productPrice = productPrice
    product.productDescription = productDescription

    await product.save()

    res.json(product)
  } catch (error) {
    console.error('Failed to update product:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await products.findByPk(id)
    console.log(
      '🚀 ~ file: products.mjs:94 ~ deleteProduct ~ product:',
      product
    )

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Call destroy on the product instance to delete it
    await product.destroy()

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Failed to delete product:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
}

const getAllProducts = async (req, res) => {
  const storeId = req.params.storeId
  console.log(
    '🚀 ~ file: products.mjs:94 ~ getAllProducts ~ storeId:',
    req.params.storeId
  )
  const searchQuery = req.query.search || ''
  try {
    const allProducts = await products.findAll({
      where: {
        storeId: storeId
        // productName: { [Op.like]: `%${searchQuery}%` }
      }
    })

    res.status(200).json({ products: allProducts })
  } catch (error) {
    console.error('Failed to get products:', error)
    res.status(500).json({ error: 'Failed to get products' })
  }
}

export { addProduct, updateProduct, deleteProduct, getAllProducts }
