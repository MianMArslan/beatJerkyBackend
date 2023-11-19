import { httpError } from '../common/httpError.mjs'
import { deleteFileFromDisk } from '../common/deleteFileFromDisk.mjs'

import db from '../models/index.js'

const { ArtistProfile } = db

const createArtistProfile = async (req, res) => {
  const { userId, artistName, bandName, about } = req.body
  if (!userId) throw httpError('userId is required!')
  try {
    const newArtistProfile = await ArtistProfile.create({
      userId,
      artistName,
      bandName,
      about,
      picture: req?.file?.path
    })
    return res.success({ data: newArtistProfile })
  } catch (error) {
    throw httpError(error.message)
  }
}

const getAllArtistProfiles = async (req, res) => {
  try {
    const artistProfiles = await ArtistProfile.findAll()
    return res.success({ data: artistProfiles })
  } catch (error) {
    throw httpError(error.message)
  }
}

const getArtistProfileById = async (req, res) => {
  const { userId } = req.query

  if (!userId) throw httpError('userId is required!')
  try {
    const artistProfile = await ArtistProfile.findAll({
      where: { userId }
    })
    if (artistProfile) {
      return res.success({ data: artistProfile })
    } else {
      throw httpError('Artist profile not found....3', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}
const getArtistProfileProfileId = async (req, res) => {
  const { id } = req.query

  if (!id) throw httpError('id is required!')
  try {
    const artistProfile = await ArtistProfile.findAll({
      where: { id }
    })
    if (artistProfile) {
      return res.success({ data: artistProfile })
    } else {
      throw httpError('Artist profile not found...', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}
const updateArtistProfileById = async (req, res) => {
  const { artistName, bandName, about } = req.body

  const { id } = req.query

  if (!id) {
    throw httpError('id is required!')
  }
  if (req?.file?.path) {
    const profile = await ArtistProfile.findByPk(id)
    const previousPicturePath = profile.picture
    if (previousPicturePath) await deleteFileFromDisk(previousPicturePath)
  }

  try {
    const record = await ArtistProfile.update(
      { artistName, bandName, about, picture: req.file?.path },
      {
        where: { id: id }
      }
    )

    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

const deleteArtistProfileById = async (req, res) => {
  const { id } = req.query

  if (!id) {
    throw httpError('id is required!')
  }
  const profile = await ArtistProfile.findByPk(id)
  const previousPicturePath = profile.picture
  if (previousPicturePath) await deleteFileFromDisk(previousPicturePath)
  try {
    const record = await ArtistProfile.destroy({ where: { id } })
    if (record) {
      return res.success({ data: record })
    } else {
      throw httpError('Artist profile not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}

export {
  createArtistProfile,
  getAllArtistProfiles,
  getArtistProfileById,
  updateArtistProfileById,
  deleteArtistProfileById,
  getArtistProfileProfileId
}
