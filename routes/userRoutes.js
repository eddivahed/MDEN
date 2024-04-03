const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// User Registration Route
router.post('/', userController.registerUser);

// User Login Route
router.post('/login', userController.loginUser);

// Get User Data Route (Protected)
router.get('/data', authMiddleware, userController.getUserData);

module.exports = router;