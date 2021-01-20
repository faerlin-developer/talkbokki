const express = require('express');
const authController = require('../controllers/authController');
const messengerController = require('../controllers/messengerController');

module.exports = io => {

    const router = express.Router();

    router.get('/user', authController.protect, messengerController.user);
    router.get('/friends', authController.protect, messengerController.friends);
    router.post('/addfriend', authController.protect, messengerController.addFriend(io));
    router.post('/messages', authController.protect, messengerController.messages);

    return router;
}