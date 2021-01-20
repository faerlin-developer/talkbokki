const express = require('express');
const authController = require('../controllers/authController');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/', authController.autoLogin, pageController.login);
router.get('/login.html', authController.autoLogin, pageController.login);

module.exports = router;