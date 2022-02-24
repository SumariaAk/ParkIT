import express from 'express';

import * as loginsController from '../controllers/login.js';

const router = express.Router();

/**
 * Create route for API
 */
router.route('/login').post(loginsController.validate);

export default router;
