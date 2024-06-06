const express = require('express');

const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');

const advancedResults = require('../middleware/advancedResults');

// Include other resource router
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

// Protect (user has to be logged in!)
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resouce routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

// Image route to upload
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootCamps)
  .post(protect, authorize('publisher', 'admin'), createBootCamp);
router
  .route('/:id')
  .get(getBootCamp)
  .put(protect, authorize('publisher', 'admin'), updateBootCamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootCamp);

module.exports = router;
