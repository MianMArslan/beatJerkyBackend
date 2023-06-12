addSong,updateSong,deleteSong,getAllSongs

import express from 'express'
const router = express.Router()
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'
import { addSong,updateSong,deleteSong,getAllSongs,addCoverImage
} from '../controller/songs.mjs'
import { upload} from '../middleware/multer.mjs';
import { coverPhotoUpload} from '../middleware/coverPhotoUploadMulter.mjs';


router.get('/',verifyAccessToken ,getAllSongs);
router.put('/:id',verifyAccessToken ,updateSong);
 router.post('/',verifyAccessToken,upload.single('file') ,addSong);
router.post('/addCoverImage/:id', verifyAccessToken, coverPhotoUpload.single('coverPhoto'), addCoverImage);
router.delete('/:id',verifyAccessToken ,deleteSong);
export default router
  