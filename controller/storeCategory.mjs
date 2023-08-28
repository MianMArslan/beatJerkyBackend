import db from '../models/index.js'
// const { category, songs } = db
const { storeCategory } = db

const deleteSpecificCategory = async (req, res) => {
  try {
    const { storeCategoryId } = req.params

    await storeCategory.destroy({
      where: {
        id: storeCategoryId
      }
    })

    res.status(200).json({ message: 'category deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' })
  }
}

// Function to create a new category
const createCategory = async (req, res) => {
  try {
    const { storeCategoryName, storeCategoryDescription } = req.body

    await storeCategory.create({
      storeCategoryName,
      storeCategoryDescription
    })

    res.status(200).json({ message: 'category created successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' })
  }
}

// Function to update a specific category
const updateSpecificCategory = async (req, res) => {
  try {
    const { storeCategoryId } = req.params
    console.log(
      '🚀 ~ file: storeCategory.mjs:41 ~ updateSpecificCategory ~ storeCategoryId:',
      storeCategoryId
    )
    const { storeCategoryName, storeCategoryDescription } = req.body
    console.log(
      '🚀 ~ file: storeCategory.mjs:43 ~ updateSpecificCategory ~ storeCategoryName, storeCategoryDescription:',
      storeCategoryName,
      storeCategoryDescription
    )

    // Logic to update the specific category with the provided categoryId and data
    await storeCategory.update(
      {
        storeCategoryName,
        storeCategoryDescription
      },
      {
        where: {
          id: storeCategoryId
        }
      }
    )

    res.status(200).json({ message: 'category updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' })
  }
}

const getAllCategories = async (req, res) => {
  try {
    const data = await storeCategory.findAll()

    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ error: 'Failed to get category' })
  }
}

// const getAllCategoriesWithSongs = async (req, res) => {
//   try {
//     const data = await category.findAll({ include: songs })
//     res.status(200).json({ data })
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to get category' })
//   }
// }

export {
  deleteSpecificCategory,
  createCategory,
  updateSpecificCategory,
  getAllCategories
  // getAllCategoriesWithSongs
}
