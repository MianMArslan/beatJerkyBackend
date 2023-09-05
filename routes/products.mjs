import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} from '../controller/products.mjs'
import { uploadProductImages } from '../middleware/multer.mjs'

router.get('/:storeId', getAllProducts)
router.put('/:id', updateProduct)

const maxImageCount = 4

router.post(
  '/',
  verifyAccessToken,
  uploadProductImages.array('files', maxImageCount),
  addProduct
)
router.delete('/:id', verifyAccessToken, deleteProduct)
export default router
