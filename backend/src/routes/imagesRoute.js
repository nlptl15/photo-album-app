/* eslint-disable comma-dangle */
const express = require('express');
const imagesController = require('../controllers/imagesController');
const auth = require('../middlewares/AuthMiddleware');
const validate = require('../middlewares/ValidatorMiddleware');
const TodoValidation = require('../validations/imageValidation');

const router = express.Router();

router.post('/', auth(), validate(TodoValidation.createTodo), imagesController.createImage);
router.get('/', auth(), imagesController.getList);
router.get('/:id', auth(), validate(TodoValidation.viewById), imagesController.viewById);
router.post('/:id', auth(), validate(TodoValidation.updateById), imagesController.updateById);
router.delete('/:id', auth(), validate(TodoValidation.deleteById), imagesController.deleteById);

module.exports = router;
