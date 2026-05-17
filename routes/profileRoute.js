const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { 
        renderUserProfile,
        updateProfilePic,
        updateUsername,
        renderOwnProfile
    } = require('../controllers/profileController');

router.get('/profile/:id', renderUserProfile);
router.patch('/profile', ensureAuthenticated, updateProfilePic);
router.patch('/profile/username', ensureAuthenticated, updateUsername);
router.get('/profile', ensureAuthenticated, renderOwnProfile);

module.exports = router;