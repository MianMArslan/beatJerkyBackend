import multer from 'multer';

// Set up the multer storage and upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/songs'); // Specify the destination folder for storing the song files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.mp3'); // Rename the uploaded file
  },
});

const upload = multer({ storage: storage });

export { upload };
