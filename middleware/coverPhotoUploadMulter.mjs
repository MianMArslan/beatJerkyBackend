import multer from 'multer'

// Set up the multer storage and upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  
    cb(null, 'public/cover-photos') // Specify the destination folder for storing the song files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg') // Rename the uploaded file
  }
})

const coverPhotoUpload = multer({ storage: storage })

export { coverPhotoUpload }
