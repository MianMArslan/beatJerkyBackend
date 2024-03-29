#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.mjs'
import http from 'http'
import db from '../models/index.js'
const { sequelize } = db
import debug from 'debug'
debug('back-end:server')
import semver from 'semver'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
let server
let port
;(async () => {
  /**
   * Check node version
   */
  if (!semver.satisfies(process.versions.node, '=v18.16.0')) {
    console.log(
      `Incorrect Node version ${process.versions.node}. It should be 18.16.0`
    )
    process.exit()
  }
  /**
   * Check db connection
   */
  try {
    await sequelize.authenticate()

    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit()
  }
  /**
   * Get port from environment and store in Express.
   */
  if (!fs.existsSync(__dirname + '/../public')) {
    fs.mkdirSync(__dirname + '/../public')
  }
  if (!fs.existsSync(__dirname + '/../public/cover-photos')) {
    fs.mkdirSync(__dirname + '/../public/cover-photos')
  }
  if (!fs.existsSync(__dirname + '/../public/songs')) {
    fs.mkdirSync(__dirname + '/../public/songs')
  }
  if (!fs.existsSync(__dirname + '/../public/profile-images')) {
    fs.mkdirSync(__dirname + '/../public/profile-images')
  }
  if (!fs.existsSync(__dirname + '/../public/feeds')) {
    fs.mkdirSync(__dirname + '/../public/feeds')
  }
  if (!fs.existsSync(__dirname + '/../public/profile')) {
    fs.mkdirSync(__dirname + '/../public/profile')
  }
  if (!fs.existsSync(__dirname + '/../public/video')) {
    fs.mkdirSync(__dirname + '/../public/video')
  }

  port = normalizePort(
    process.env.NODE_ENV == 'development'
      ? process.env.PORT || '7001'
      : process.env.PORT || '3001'
  )
  app.set('port', port)

  /**
   * Create HTTP server.
   */

  server = http.createServer(app)

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port)

  server.on('error', onError)
  server.on('listening', onListening)
})()
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log('Listening on ' + bind)
}
