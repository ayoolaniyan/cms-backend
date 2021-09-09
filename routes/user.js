const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post("/signup", userController.createUser);

router.post("/login", userController.userLogin);

router.get("/:id", userController.getUser);

router.put("/:id", userController.addProfile);


module.exports = router;