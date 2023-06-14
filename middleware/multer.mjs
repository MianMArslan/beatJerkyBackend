import multer from 'multer'
import { httpError } from '../common/httpError.mjs'

// Set up the multer storage and upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/songs') // Specify the destination folder for storing the song files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.mp3') // Rename the uploaded file
  }
})

const feedStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/feeds/')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const imageFileFilter = function (req, file, callback) {
  // accept image only

  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
    return callback(null, false)
  }
  callback(null, true)
}

const uploadFeed = multer({
  storage: feedStorage,
  fileFilter: imageFileFilter
})

const upload = multer({ storage: storage })

export { upload, uploadFeed }
