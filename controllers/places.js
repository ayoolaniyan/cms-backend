const Place = require('../models/place');

exports.createPlace = (req, res, next) => {
    // const url = req.protocol + '://' + req.get("host");
    const place = new Place({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        availableFrom: req.body.availableFrom,
        availableTo: req.body.availableTo,
        userId: req.body.userId
    });
    place.save().then(createdPlace => {
        res.status(201).json({
            message: 'Place Added Successfully!',
            place: {
                ...createdPlace,
                id: createdPlace._id
            }
        });
    })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a place failed!'
            });
        });
};

exports.updatePlace = (req, res, next) => {
    // let imageUrl = req.body.imageUrl;
    // if (req.file) {
    //     const url = req.protocol + '://' + req.get("host");
    //     imageUrl = url + "/images/" + req.file.filename
    // }
    const place = new Place({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        availableFrom: req.body.availableFrom,
        availableTo: req.body.availableTo,
        userId: req.body.userId
    });
    // Place.updateOne({ _id: req.params.id, userId: req.userData.userId }, place).then(result => {
    Place.updateOne({ _id: req.params.id }, place).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Update Successful!" });
        } else {
            res.status(401).json({ message: "Not Authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: 'Could not update place!'
            });
        });
};

exports.getPlaces = (req, res, next) => {
    Place.find().then(place => {
        if (place) {
            res.status(200).json(place);
        } else {
            res.status(404).json({ message: 'Place info not found' });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching places info failed!'
            });
        });
};

exports.getPlace = (req, res, next) => {
    Place.findById(req.params.id).then(place => {
        if (place) {
            res.status(200).json(place);
        } else {
            res.status(404).json({ message: 'Place not found' });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching place failed!'
            });
        });
};

exports.deletePlace = (req, res, next) => {
    // Place.deleteOne({ _id: req.params.id, userId: req.userData.userId })
    Place.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            if (result.n > 0) {
                res.status(200).json({ message: "Deleted Successful!" });
            } else {
                res.status(401).json({ message: "Not Authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting place failed!'
            });
        });
};