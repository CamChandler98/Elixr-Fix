const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const drinksRouter = require('./drinks')
const categoriesRouter = require('./category')
const reviewsRouter = require('./reviews')
const friendsRouter = require('./friends')
const requestsRouter = require('./request')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/drinks',drinksRouter)

router.use('/categories',categoriesRouter)

router.use('/reviews', reviewsRouter)

router.use('/friends', friendsRouter)

router.use('/requests', requestsRouter)
module.exports = router;
