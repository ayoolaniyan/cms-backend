const express = require('express');

const PlaceController = require('../controllers/places');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post("", PlaceController.createPlace);
// router.post("", checkAuth, extractFile, PlaceController.createPost);

router.put("/:id", PlaceController.updatePlace);
// router.put("/:id", checkAuth, extractFile, PlaceController.updatePost);

router.get("", PlaceController.getPlaces);

router.get("/:id", PlaceController.getPlace);

router.delete("/:id", PlaceController.deletePlace);
// router.delete("/:id", checkAuth, PlaceController.deletePost);

module.exports = router;