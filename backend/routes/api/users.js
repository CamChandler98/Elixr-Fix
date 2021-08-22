const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

const { Op } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.')
      .custom((value) => {
        return User.findOne({ where: { email: value } })
            .then((user) => {
                if (user) {
                    return Promise.reject('The provided Email Address is already in use by another account');
                }
            });
    }),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.')
      .custom((value) => {
        return User.findOne({ where: { username: value } })
            .then((user) => {
                if (user) {
                    return Promise.reject('The provided username is unavailable');
                }
            });
    }),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
      check('confirmPassword')
      .exists({ checkFalsy: true })
      .withMessage('Must confirm your password')
      .custom((value, { req }) => {
          if (value !== req.body.password) {
              throw new Error('Confirm Password does not match Password');
          }
          return true;
      }),
    handleValidationErrors,
  ];

router.get('/:username', asyncHandler( async (req,res) => {
    const {username} = req.params

    let found  = await User.findOne({
      where: {
        username: {[Op.iLike]: '%' + username + '%'}
      }
    })
    let user = found.toSafeObject()

    res.json(user)
}))
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const private = true
      const user = await User.signup({ private,email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );


module.exports = router;
