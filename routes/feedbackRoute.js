const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const {
  renderFeedback,
  postFeedback
} = require('../controllers/feedbackController');

router.get('/', ensureAuthenticated, renderFeedback);
router.post('/', ensureAuthenticated, postFeedback);

module.exports = router;