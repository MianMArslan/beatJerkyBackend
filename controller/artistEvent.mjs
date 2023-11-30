import { httpError } from '../common/httpError.mjs'
import db from '../models/index.js'
import { deleteFileFromDisk } from '../common/deleteFileFromDisk.mjs'

const { Event } = db

const createEvent = async (req, res) => {
  const {
    eventName,
    artistName,
    eventPlace,
    eventStartTime,
    eventEndTime,
    artistProfileId,
    longitude,
    latitude,
    clientId
  } = req.body

  if (
    !eventName ||
    !artistName ||
    !eventPlace ||
    !eventStartTime ||
    !eventEndTime ||
    !artistProfileId ||
    !clientId
  ) {
    throw httpError('Required fields are missing!')
  }

  try {
    const newEvent = await Event.create({
      eventName,
      artistName,
      eventPlace,
      eventStartTime,
      eventEndTime,
      picturePath: req.file.path,
      longitude,
      latitude,
      artistProfileId,
      clientId
    })

    return res.success({ data: newEvent })
  } catch (error) {
    throw httpError(error.message)
  }
}

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll()
    return res.success({ data: events })
  } catch (error) {
    throw httpError(error.message)
  }
}

const getEventById = async (req, res) => {
  const { artistProfileId } = req.query

  if (!artistProfileId) {
    throw httpError('artistProfileId is required!')
  }

  try {
    const event = await Event.findAll({
      where: { artistProfileId }
    })

    if (event) {
      return res.success({ data: event })
    } else {
      throw httpError('Event not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}
const getEventByClientId = async (req, res) => {
  const { clientId } = req.query

  if (!clientId) {
    throw httpError('clientId is required!')
  }

  try {
    const event = await Event.findAll({
      where: { clientId }
    })

    if (event) {
      return res.success({ data: event })
    } else {
      throw httpError('Event not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}

const getEventByEventId = async (req, res) => {
  const { id } = req.query

  if (!id) {
    throw httpError('eventProfileId is required!')
  }

  try {
    const event = await Event.findAll({
      where: { id }
    })

    if (event) {
      return res.success({ data: event })
    } else {
      throw httpError('Event not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}

const updateEventById = async (req, res) => {
  const {
    eventName,
    artistName,
    eventPlace,
    eventStartTime,
    eventEndTime,

    longitude,
    latitude
  } = req.body
  const { id } = req.query

  if (!id) {
    throw httpError('id is required!')
  }
  if (req?.file?.path) {
    const event = await Event.findByPk(id)
    const previousPicturePath = event?.picturePath
    if (previousPicturePath) await deleteFileFromDisk(previousPicturePath)
  }
  try {
    const record = await Event.update(
      {
        eventName,
        artistName,
        eventPlace,
        eventStartTime,
        eventEndTime,
        picturePath: req.file.path,
        longitude,
        latitude
      },
      {
        where: { id: id }
      }
    )

    return res.success({ data: record })
  } catch (error) {
    throw httpError(error.message)
  }
}

const deleteEventById = async (req, res) => {
  const { id } = req.query

  if (!id) {
    throw httpError('id is required!')
  }
  const event = await Event.findByPk(id)
  const previousPicturePath = event?.picturePath
  if (previousPicturePath) await deleteFileFromDisk(previousPicturePath)
  try {
    const record = await Event.destroy({ where: { id } })

    if (record) {
      return res.success({ data: record })
    } else {
      throw httpError('Event not found', 404)
    }
  } catch (error) {
    throw httpError(error.message)
  }
}

export {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getEventByEventId,
  getEventByClientId
}
