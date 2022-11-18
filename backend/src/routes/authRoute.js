const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/ValidatorMiddleware');
const AuthValidation = require('../validations/authValidation');

const router = express.Router();

router.post('/login', validate(AuthValidation.login), authController.login);
router.post('/signup', validate(AuthValidation.signup), authController.signup);
router.get('/validate-user', authController.validateLoggedInUser);
router.get('/logout', authController.logout);

module.exports = router;
