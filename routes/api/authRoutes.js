const router = require('express').Router();

const authController = require('../../controllers/api/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword);

module.exports = router;
