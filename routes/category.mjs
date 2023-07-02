import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import {
  deleteSpecificCategory,
  createCategory,
  updateSpecificCategory,
  getAllCategories,
  getAllCategoriesWithSongs
} from '../controller/category.mjs'

router.get('/', verifyAccessToken, getAllCategories)
router.get('/getAllCategoriesWithSongs', getAllCategoriesWithSongs)

router.put('/:categoryId', verifyAccessToken, updateSpecificCategory)
router.post('/createCategory', verifyAccessToken, createCategory)

router.delete('/:categoryId', verifyAccessToken, deleteSpecificCategory)
export default router
