const express = require('express');
const router = express.Router();
const { 
        renderUserProfile,
        updateProfilePic,
        renderOwnProfile
    } = require('../controllers/profileController');

router.get('/profile/:id', renderUserProfile);
router.patch('/profile', updateProfilePic);
router.get('/profile', renderOwnProfile);

module.exports = router;