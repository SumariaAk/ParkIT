import express from 'express';

import * as usersController from '../controllers/users.js';

const router = express.Router();

/**
 * Create route for API
 */
router.route('/users').get(usersController.index).post(usersController.save);

router.use('/parkingimg', express.static('public/images'));
router
  .route('/users/:id')
  .get(usersController.get)
  .put(usersController.update)
  .delete(usersController.remove);

export default router;
