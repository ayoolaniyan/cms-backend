const express = require('express');

const BookingController = require('../controllers/bookings');

const router = express.Router();

router.post("", BookingController.createBooking);

router.get("", BookingController.getBookings);

router.get("/:id", BookingController.getBooking);

module.exports = router;