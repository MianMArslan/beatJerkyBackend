import db from '../models/index.js'
const { songs } = db

// Add a new song
const addSong = async (req, res) => {
  try {
    const { title, singer, year, descriptionOfSong, categories } = req.body

    // Create a new song record in the database
    const newSong = await songs.create({
      title,
      singer,
      year,
      descriptionOfSong,
      fileURL: req.file.filename, // Store the filename in the fileURL attribute
      categories
    })

    // Return the newly created song
    res.status(201).json(newSong)
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
    const { title, singer, year, descriptionOfSong, songCategoryID } = req.body

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
    song.songCategoryID = songCategoryID

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
    console.log('🚀 ~ file: songs.mjs:65 ~ deleteSong ~ id:', id)

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
  try {
    // Retrieve all songs from the database
    const allSongs = await songs.findAll()
    console.log('🚀 ~ file: songs.mjs:91 ~ getAllSongs ~ allSongs:', allSongs)

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
    console.log(
      '🚀 ~ file: songs.mjs:120 ~ addCoverImage ~ req.file:',
      req.file
    )
    const { id } = req.params
    console.log('🚀 ~ file: songs.mjs:110 ~ addCoverImage ~ id:', id)

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
