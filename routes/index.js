// Define URL routes and HTTP methods
const express = require('express');
const router = express.Router();

const {
    renderIndex,
    renderLogin,
    renderSignup,
    renderProfile,
    renderFriends,
    renderRoomlist,
    renderCreateroom,
    renderRoombase,
    renderLeaderboards,
    renderFeedback,
} = require('../controllers/indexController');

const { postSignup, postLogin, getLogout } = require('../controllers/authController');

// GET routes for each page
router.get('/', renderIndex);
router.get('/login', renderLogin);
router.get('/signup', renderSignup);
router.get('/profile', renderProfile);
router.get('/friends', renderFriends);
router.get('/roomlist', renderRoomlist);
router.get('/createroom', renderCreateroom);
router.get('/roombase', renderRoombase);
router.get('/leaderboards', renderLeaderboards);
router.get('/feedback', renderFeedback);

const { updateProfilePic } = require('../controllers/profileController');

// Authentication routes
router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/logout', getLogout);

// Profile actions
router.patch('/profile', updateProfilePic);

module.exports = router;