// Import any required dependencies

import db from '../models/index.js'
const { categories, songs } = db
// Function to delete a specific categories
const deleteSpecificCategory = async (req, res) => {
  try {
    const { categoryId } = req.params

    // Logic to delete the specific categories with the provided categoryId
    await categories.destroy({
      where: {
        id: categoryId
      }
    })

    res.status(200).json({ message: 'categories deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete categories' })
  }
}

// Function to create a new categories
const createCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body

    // Logic to create a new categories with the provided data
    await categories.create({
      categoryName,
      categoryDescription
    })

    res.status(200).json({ message: 'categories created successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create categories' })
  }
}

// Function to update a specific categories
const updateSpecificCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const { categoryName, categoryDescription } = req.body

    // Logic to update the specific categories with the provided categoryId and data
    await categories.update(
      {
        categoryName,
        categoryDescription
      },
      {
        where: {
          id: categoryId
        }
      }
    )

    res.status(200).json({ message: 'categories updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update categories' })
  }
}

// Function to get all categories
const getAllCategories = async (req, res) => {
  try {
    // Logic to get all categories from the database
    const data = await categories.findAll()

    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ error: 'Failed to get categories' })
  }
}

const getAllCategoriesWithSongs = async (req, res) => {
  try {
    const data = await categories.findAll({ include: songs })
    res.status(200).json({ data })
  } catch (error) {
    res.status(400).json({ error: 'Failed to get categories' })
  }
}

export {
  deleteSpecificCategory,
  createCategory,
  updateSpecificCategory,
  getAllCategories,
  getAllCategoriesWithSongs
}
