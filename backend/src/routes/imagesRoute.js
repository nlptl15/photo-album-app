/* eslint-disable comma-dangle */
const express = require('express');
const imagesController = require('../controllers/imagesController');
const auth = require('../middlewares/AuthMiddleware');
const validate = require('../middlewares/ValidatorMiddleware');
const ImageValidation = require('../validations/imageValidation');

const router = express.Router();

router.post('/', auth(), validate(ImageValidation.createImage), imagesController.createImage);
router.get('/', auth(), imagesController.getList);
router.get('/:id', auth(), validate(ImageValidation.viewById), imagesController.viewById);
router.post('/:id', auth(), validate(ImageValidation.updateById), imagesController.updateById);
router.post(
  '/:id/remove',
  auth(),
  validate(ImageValidation.deleteById),
  imagesController.deleteById
);

module.exports = router;
