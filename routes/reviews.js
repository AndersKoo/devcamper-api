const express = require('express');

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
// Protect (user has to be logged in!)
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, { path: 'bootcamp', select: 'name description' }),
    getReviews
  );
router
  .route('/:id')
  .post(protect, authorize('user', 'admin'), addReview)
  .put(protect, authorize('user', 'admin'), updateReview);

router.route('/:id').get(getReview);
module.exports = router;
