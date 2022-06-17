const express = require('express');
const router = express();
const user = require('../../controller/userController');
const { upload } = require('../../middleware/multer');
const passport = require('passport')
const { validator } = require('../../helper/validator');
const validateUser = require('../../validation/userValidate')
const { generateToken } = require('../../helper/genrateToken')
//this api use for register the user
router.post('/signup', upload.single('profile'), validator.body(validateUser.register), user.signup);
//this api use for logging the user
router.post('/logging', generateToken, validator.body(validateUser.logging), user.logging);
// this api use for view profile the logged user
router.get('/viewProfile', passport.authenticate('jwt', { session: false }), user.viewProfile);
//this api use for update profile the logged user
router.post('/updateProfile', upload.single('profile'), passport.authenticate('jwt', { session: false }), validator.body(validateUser.update), user.updateProfile);
//this api use for  reset password the logged user
router.post('/resetPassword', passport.authenticate('jwt', { session: false }), validator.body(validateUser.resetpassword), user.resetPassword);
module.exports = router;