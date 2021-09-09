const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
    const user = new User(req.body);
    user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Invalid authentication credentials'
            });
        });

};

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed!'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Auth failed!'
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY, { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Invalid authentication credentials!'
            });
        });
};

exports.addProfile = (req, res, next) => {
    const user = new User({
        _id: req.params.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    User.updateOne({ _id: req.params.id }, user).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Update Successful!" });
        } else {
            res.status(401).json({ message: "Not Authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: 'Could not update post!'
            });
        });
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.id).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User info not found' });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching user info failed!'
            });
        });
};

