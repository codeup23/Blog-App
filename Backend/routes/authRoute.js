const express = require('express');
const router = express.Router();

// import the controllers
const { register, login, logout, profile } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

// create the routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', auth, profile);

// export route
module.exports = router;