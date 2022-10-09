const router = require('express').Router();
const hotel = require('./hotels');
const auth = require('./auth');
const user = require('./users')
const room = require('./rooms')

router.use('/hotel',hotel);
router.use('/auth',auth);
router.use('/user',user);
router.use('/room',room);

module.exports = router;
