const express = require('express');
const { authenticateParticipant } = require('../../../middlewares/auth');
const router = express()
const {
    signup,
    activeParticipant,
    signin,
    getAllLandingPage,
    getDetailLandingPage,
    getDashboard,
    checkout,
    getAllPayment,
  } = require('./controller');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.put('/active', activeParticipant);
router.get('/events', getAllLandingPage);
router.get('/events/:id', getDetailLandingPage);
router.post('/checkout', authenticateParticipant, checkout);
router.get('/orders', authenticateParticipant, getDashboard);
router.get('/payments/:organizer', authenticateParticipant, getAllPayment);

module.exports = router;