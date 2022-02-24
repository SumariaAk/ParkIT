import express from 'express';

import * as parkingspacesController from '../controllers/parkingspaces.js';

const router = express.Router();
import multer from 'multer';
//import { auth } from '../middleware/auth.js';
import auth from '../middleware/auth.js';

//store file in the public/images/ folder with new fileName containing timestamp
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, './public/images/');
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

//check if valid file is sent
const upload = multer({
  storage: storage,
  fileFilter: (request, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

/**
 * Create route for API
 */
router.route('/parkingspaces').get(parkingspacesController.index);
//router.get('/parkingspaces', auth, parkingspacesController.index);

router.post(
  '/parkingspaces',
  upload.single('parking_img'),
  parkingspacesController.save
);

router
  .route('/parkingspaces/:id')
  .get(parkingspacesController.get)
  .delete(parkingspacesController.remove);

router.put(
  '/parkingspaces/:id',
  upload.single('parking_img'),
  parkingspacesController.update
);

export default router;
