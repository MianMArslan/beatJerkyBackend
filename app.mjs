import createError from 'http-errors'
import env from 'dotenv'
import cors from 'cors'
env.config()
import express from 'express'
import helmet from 'helmet'
import path from 'path'
const __dirname = path.resolve()
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { JSend } from 'jsend-express'
import 'express-async-errors'
import error from './middleware/error.mjs'
import setRoutes from './routes/index.mjs'

const app = express()
const jSend = new JSend({ name: 'beatJerky', version: '1.0.0', release: '1' })
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const corsOptions = {
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://www.beatjerky.com/api/',
    'http://www.beatjerky.com/'
  ]
}
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'public')))
app.use(jSend.middleware.bind(jSend))

// const server = http.createServer(app)

setRoutes(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
error(app)

export default app
