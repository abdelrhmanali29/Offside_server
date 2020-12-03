const express = require('express');
const userController = require('./user.controller');
const authController = require('./authController');
const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

module.exports = router;
