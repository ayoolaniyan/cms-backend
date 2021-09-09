const Booking = require('../models/booking');

exports.createBooking = (req, res, next) => {
    const booking = new Booking({
        placeId: req.body.placeId,
        userId: req.body.userId,
        placeTitle: req.body.placeTitle,
        placeImage: req.body.placeImage,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        guestNumber: req.body.guestNumber,
        bookedFrom: req.body.bookedFrom,
        bookedTo: req.body.bookedTo
    });
    booking.save().then(bookedPlace => {
        res.status(201).json({
            message: 'Booking Added Successfully!',
            booking: {
                ...bookedPlace,
                id: bookedPlace._id
            }
        });
        console.log(bookedPlace);
    })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a booking failed!'
            });
            console.log(error);
        });
};

exports.getBookings = (req, res, next) => {
    Booking.find().then(booking => {
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: 'Bookings not found' });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching bookings info failed!'
            });
        });
};

exports.getBooking = (req, res, next) => {
    Booking.findById(req.params.id).then(booking => {
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching booking failed!'
            });
        });
};
