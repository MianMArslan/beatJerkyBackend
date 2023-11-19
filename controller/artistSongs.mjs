import { deleteFileFromDisk } from '../common/deleteFileFromDisk.mjs'
import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'

const { ArtistSongs, ArtistProfile } = db

const createSong = async (req, res) => {
  const { artistSongsStorage, artistSongCoverImgStorage } = req.files
  const songPath = artistSongsStorage[0].path
  const imgPath = artistSongCoverImgStorage[0].path

  const {
    songName,

    songCategoryId,

    artistId,
    artistName,
    bandName
  } = req.body
  if (!artistId) {
    throw httpError('Artist id is required!')
  }

  try {
    const newSong = await ArtistSongs.create({
      songName,
      songPath: songPath,
      songCategoryId,
      picturePath: imgPath,
      artistId,
      artistName,
      bandName
    })
    return res.success({ data: newSong })
  } catch (error) {
    throw httpError(error.message)
  }
}

const getAllSongs = async (req, res) => {
  try {
    const songs = await ArtistSongs.findAll()
    return res.success({ data: songs })
  } catch (error) {
    throw httpError(error.message)
  }
}

const getSongById = async (req, res) => {
  const { id } = req.query

  if (!id) throw httpError('id is required!')
  try {
    const song = await ArtistSongs.findByPk(id)
    if (song) {
      return res.success({ data: song })
    } else {
      throw httpError('Artist Song not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}
const getSongsByArtistId = async (req, res) => {
  const { artistId } = req.query

  if (!artistId) throw httpError('artistId is required!')

  try {
    const artistProfile = await ArtistProfile.findByPk(artistId)

    if (!artistProfile) {
      throw httpError('Artist profile not found', 404)
    }

    const songs = await ArtistSongs.findAll({
      where: { artistId }
    })

    return res.success({ data: songs })
  } catch (error) {
    throw httpError(error.message)
  }
}
const updateSongById = async (req, res) => {
  const { artistSongsStorage, artistSongCoverImgStorage } = req.files
  const songPath = artistSongsStorage[0].path
  const imgPath = artistSongCoverImgStorage[0].path
  const {
    songName,

    songCategoryId,

    artistId,
    artistName,
    bandName
  } = req.body
  const { id } = req.query
  if (!id) {
    throw httpError('id is required!')
  }
  const data = await ArtistSongs.findByPk(id)
  if (songPath) {
    const previousSongPath = data.songPath
    if (previousSongPath) await deleteFileFromDisk(previousSongPath)
  }
  if (imgPath) {
    const previousPicturePath = data.picturePath
    if (previousPicturePath) await deleteFileFromDisk(previousPicturePath)
  }

  try {
    const [updatedCount] = await ArtistSongs.update(
      {
        songName,
        songPath: songPath,
        songCategoryId,
        picturePath: imgPath,
        artistId,
        artistName,
        bandName
      },
      { where: { id } }
    )

    if (updatedCount > 0) {
      return res.success({ message: 'Artist Song updated successfully' })
    } else {
      throw httpError('Artist Song not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}

const deleteSongById = async (req, res) => {
  const { id } = req.query

  if (!id) {
    throw httpError('id is required!')
  }
  const data = await ArtistSongs.findByPk(id)

  const previousSongPath = data?.songPath
  if (previousSongPath) await deleteFileFromDisk(previousSongPath)

  const previousPicturePath = data?.picturePath
  if (previousPicturePath) await deleteFileFromDisk(previousPicturePath)

  try {
    const deletedCount = await ArtistSongs.destroy({ where: { id } })
    if (deletedCount > 0) {
      return res.success({ message: 'Artist Song deleted successfully' })
    } else {
      throw httpError('Artist Song not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}

export {
  createSong,
  getAllSongs,
  getSongById,
  updateSongById,
  deleteSongById,
  getSongsByArtistId
}
