import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'
const { checkout } = db

// Get all checkout entries
const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await checkout.findAll()
    return res.success({ data: checkouts })
  } catch (error) {
    throw httpError(error.message)
  }
}

// Create a new checkout entry
const createCheckout = async (req, res) => {
  const {
    productName,
    productId,
    storeName,
    storeId,
    userId,
    userName,
    productPrice,
    productDiscount,
    OrderId,
    orderStatus
  } = req.body

  try {
    const record = await checkout.create({
      productName,
      productId,
      storeName,
      storeId,
      userId,
      userName,
      productPrice,
      productDiscount,
      OrderId,
      orderStatus
    })
    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}
const updateOrderStatus = async (req, res) => {
  const { orderStatus, orderId } = req.query

  try {
    const result = await checkout.update(
      {
        orderStatus
      },
      {
        where: {
          OrderId: orderId
        }
      }
    )

    if (!res) throw httpError('Order not found')

    return res.success({ data: result })
  } catch (error) {
    throw httpError(error.message)
  }
}

export { getAllCheckouts, createCheckout, updateOrderStatus }
