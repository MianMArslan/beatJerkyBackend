import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  deleteSpecificCategory,
  createCategory,
  updateSpecificCategory,
  getAllCategories
} from '../controller/storeCategory.mjs'

router.get('/', verifyAccessToken, getAllCategories)
// router.get('/getAllCategoriesWithSongs', getAllCategoriesWithSongs)

router.put('/:storeCategoryId', verifyAccessToken, updateSpecificCategory)
router.post('/createCategory', verifyAccessToken, createCategory)

router.delete('/:storeCategoryId', verifyAccessToken, deleteSpecificCategory)
export default router
