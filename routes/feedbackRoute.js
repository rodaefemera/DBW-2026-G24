const express = require('express');
const router = express.Router();
const {
  renderFeedback,
  postFeedback
} = require('../controllers/feedbackController');

router.get('/', renderFeedback);
router.post('/', postFeedback);

module.exports = router;