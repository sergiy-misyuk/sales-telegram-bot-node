const express = require('express');
const router = express.Router();

const {
  checkContentSomePhotos,
  checkContentOnePhoto,
} = require('../services/photo');

const {
  upload,
  multerErrorHandling,
} = require('../middlewares/uploadMiddleware');

router.get('/', function (req, res) {
  res.send('Hello World');
});

router.post('/check-one-photo', checkContentOnePhoto);

router.post(
  '/check-photos',
  upload.array('photos', 5),
  multerErrorHandling,
  checkContentSomePhotos
);

module.exports = { notifyRoutes: router };
