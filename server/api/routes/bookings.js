import express from "express";

import * as bookingController from "../controllers/bookings.js";

const router = express.Router();

/**
 * Create route for API
 */
 router
 .route("/bookings")
 .get(bookingController.index)
 .post(bookingController.save);

router
 .route("/bookings/:id")
 .get(bookingController.get)
 .put(bookingController.update)
 .delete(bookingController.remove);

export default router;