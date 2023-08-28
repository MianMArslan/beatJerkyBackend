import multer from 'multer'

// Set up the multer storage and upload configuration for store images
const storeImageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/storeImage') // Specify the destination folder for storing store images
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    callback(
      null,
      file.fieldname + '_' + uniqueSuffix + '_' + file.originalname
    ) // Rename the uploaded file
  }
})

const imageFileFilter = (req, file, callback) => {
  // Accept image only with allowed extensions
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(
      new Error('Only JPG, JPEG, and PNG images are allowed.'),
      false
    )
  }
  callback(null, true)
}

// Create the multer instance for store image uploads
const uploadStoreImage = multer({
  storage: storeImageStorage,
  fileFilter: imageFileFilter
})

export default uploadStoreImage
