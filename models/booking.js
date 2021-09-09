const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    placeTitle: { type: String, required: true },
    placeImage: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    guestNumber: { type: Number, required: true },
    bookedFrom: { type: Date, required: true },
    bookedTo: { type: Date, required: true },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }

});

module.exports = mongoose.model('Booking', bookingSchema);