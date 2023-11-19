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
const profileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/profile')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const artistProfileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/artistProfilesImages')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const eventImgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/artistEventsImages')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})

const artistSongCoverImgAndSongStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Set the destination folder based on the fieldname
    if (file.fieldname === 'artistSongsStorage') {
      callback(null, 'public/artistSongs')
    } else if (file.fieldname === 'artistSongCoverImgStorage') {
      callback(null, 'public/artistSongCoverImg')
    } else {
      callback('Invalid fieldname', null)
    }
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})

const storeImage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/storeImage')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const productImages = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/productImages')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const videoStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/video')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const imageFileFilter = function (req, file, callback) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
    return callback(null, false)
  }
  callback(null, true)
}
const audioFileFilter = function (req, file, callback) {
  if (!file.originalname.match(/\.(mp3|wav|ogg|aac|flac)$/)) {
    return callback(null, false)
  }
  callback(null, true)
}

const audioAndImgFilter = (req, file, callback) => {
  if (
    file.fieldname === 'artistSongsStorage' &&
    file.originalname.match(/\.(mp3|wav|ogg|aac|flac)$/)
  ) {
    callback(null, true)
  } else if (
    file.fieldname === 'artistSongCoverImgStorage' &&
    file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)
  ) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const videoFileFilter = function (req, file, callback) {
  if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
    return callback(null, false)
  }
  callback(null, true)
}
const uploadFeed = multer({
  storage: feedStorage,
  fileFilter: imageFileFilter
})
const uploadProfile = multer({
  storage: profileStorage,
  fileFilter: imageFileFilter
})
const uploadArtistProfile = multer({
  storage: artistProfileStorage,
  fileFilter: imageFileFilter
})
const uploadArtistEventImg = multer({
  storage: eventImgStorage,
  fileFilter: imageFileFilter
})

const uploadArtistSongImgAndSong = multer({
  storage: artistSongCoverImgAndSongStorage,
  fileFilter: audioAndImgFilter
})

//
const uploadVideo = multer({
  storage: videoStorage,
  limits: 40000000,
  fileFilter: videoFileFilter
})
const uploadStoreImage = multer({
  storage: storeImage,
  fileFilter: imageFileFilter
})
const uploadProductImages = multer({
  storage: productImages,
  fileFilter: imageFileFilter
})
const upload = multer({ storage: storage })

export {
  upload,
  uploadFeed,
  uploadProfile,
  uploadVideo,
  uploadStoreImage,
  uploadProductImages,
  uploadArtistProfile,
  uploadArtistEventImg,
  uploadArtistSongImgAndSong
}
