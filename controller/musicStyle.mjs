// Import any required dependencies

import db from '../models/index.js'
const { musicStyle ,songs } = db
// Function to delete a specific musicStyle
const deleteSpecificMusicStyle = async (req, res) => {
  try {
    const { musicStyleId } = req.params

    // Logic to delete the specific musicStyle with the provided musicStyleId
    await musicStyle.destroy({
      where: {
        id: musicStyleId
      }
    })

    res.status(200).json({ message: 'musicStyle deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete musicStyle' })
  }
}

// Function to create a new musicStyle
const createMusicStyle = async (req, res) => {
  try {
    const { musicStyleName, musicStyleDescription } = req.body
    console.log(
      '🚀 ~ file: musicStyle.mjs:26 ~ createmusicStyle ~ req.body:',
      req.body
    )

    // Logic to create a new musicStyle with the provided data
    await musicStyle.create({
      musicStyleName,
      musicStyleDescription
    })

    res.status(200).json({ message: 'musicStyle created successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create musicStyle' })
  }
}

// Function to update a specific musicStyle
const updateSpecificMusicStyle = async (req, res) => {
   try {
    const { MusicStyleId } = req.params
    console.log("🚀 ~ file: musicStyle.mjs:49 ~ updateSpecificMusicStyle ~ req.params:", req.params)
    const { musicStyleName, musicStyleDescription } = req.body

    // Logic to update the specific musicStyle with the provided musicStyleId and data
    await musicStyle.update(
      {
        musicStyleName,
        musicStyleDescription
      },
      {
        where: {
          id: MusicStyleId
        }
      }
    )

    res.status(200).json({ message: 'musicStyle updated successfully' })
  } catch (error) {
    console.log("🚀 ~ file: musicStyle.mjs:66 ~ updateSpecificMusicStyle ~ error:", error)
    res.status(500).json({ error: 'Failed to update musicStyle' })
  }
}

// Function to get all musicStyle
const getAllMusicStyle = async (req, res) => {
  try {
    // Logic to get all musicStyle from the database
    const data = await musicStyle.findAll()

    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get musicStyle' })
  }
}


const getAllMusicStyleWithSongs = async (req, res) => {
   
  try {
    
    const data = await musicStyle.findAll({ include: songs});
 
    res.status(200).json({ data })
  } catch (error) {
     res.status(500).json({ error: 'Failed to get musicStyle' })
  }
}


export {
  deleteSpecificMusicStyle,
  createMusicStyle,
  updateSpecificMusicStyle,
  getAllMusicStyle,
  getAllMusicStyleWithSongs
}
