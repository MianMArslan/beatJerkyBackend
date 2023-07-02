import { Op } from 'sequelize'
import db from '../models/index.js'
const { songs } = db

// Add a new song
const addSong = async (req, res) => {
  try {
    const { title, singer, year, descriptionOfSong, songCategoryID } = req.body

    // Create a new song record in the database
    const newSong = await songs.create({
      title,
      singer,
      year,
      descriptionOfSong,
      fileURL: req.file.filename, // Store the filename in the fileURL attribute
      songCategoryID
    })

    const status = 200
    const message = 'Song added successfully'
    res.status(200).success({ status, message })
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Failed to add song:', error)
    res.status(500).json({ error: 'Failed to add song' })
  }
}

// Update an existing song
const updateSong = async (req, res) => {
  try {
    const { id } = req.params
    const { title, singer, year, descriptionOfSong } = req.body

    // Find the song by ID
    const song = await songs.findByPk(id)

    if (!song) {
      // Return an error if the song is not found
      return res.status(404).json({ error: 'Song not found' })
    }

    // Update the song attributes
    song.title = title
    song.singer = singer
    song.year = year
    song.descriptionOfSong = descriptionOfSong
    // song.songCategoryID = songCategoryID

    // Save the updated song to the database
    await song.save()

    // Return the updated song
    res.json(song)
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Failed to update song:', error)
    res.status(500).json({ error: 'Failed to update song' })
  }
}

// Delete a song
const deleteSong = async (req, res) => {
  try {
    const { id } = req.params

    // Find the song by ID
    const song = await songs.findByPk(id)

    if (!song) {
      // Return an error if the song is not found
      return res.status(404).json({ error: 'Song not found' })
    }

    // Delete the song from the database
    await song.destroy()

    // Return a success message
    res.json({ message: 'Song deleted successfully' })
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Failed to delete song:', error)
    res.status(500).json({ error: 'Failed to delete song' })
  }
}

// Get all songs
const getAllSongs = async (req, res) => {
  const searchQuery = req.query.search || ''
  try {
    // Retrieve all songs from the database
    const allSongs = await songs.findAll({
      where: { title: { [Op.like]: `%${searchQuery}%` } }
    })

    // Return the list of songs
    // res.json(allSongs);
    res.status(200).json({ songs: allSongs })
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Failed to get songs:', error)
    res.status(500).json({ error: 'Failed to get songs' })
  }
}

const addCoverImage = async (req, res) => {
  try {
    const { id } = req.params

    // Find the song by ID
    const song = await songs.findByPk(id)

    if (!song) {
      // Return an error if the song is not found
      return res.status(404).json({ error: 'Song not found' })
    }

    // Update the song with the cover image filename
    song.coverImageURL = req.file.filename

    // Save the updated song to the database
    await song.save()

    // Return the updated song
    res.json(song)
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Failed to add cover image:', error)
    res.status(500).json({ error: 'Failed to add cover image' })
  }
}

export { addSong, updateSong, deleteSong, getAllSongs, addCoverImage }
