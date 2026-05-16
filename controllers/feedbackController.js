const feedback = require('../models/feedbackModel');

const renderFeedback = (req, res) => {
  res.render('feedback', { title: 'Feedback - MATRIOSCA' });
}

const postFeedback = async (req, res) => {
  try {
    const { email, message } = req.body;

    await Feedback.create({
      email: email?.trim() || undefined,
      message: message.trim()
    });

    res.redirect('/feedback');
  } catch (err) {
    console.error(err);
    res.status(500).render('feedback', {
      title: 'Feedback - MATRIOSCA',
      error: 'Não foi possível guardar o feedback.'
    });
  }
}

module.exports = {
  renderFeedback,
  postFeedback
};