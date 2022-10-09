const router = require('express').Router();
const Api = require('./api')

router.use('/api',Api);

module.exports = router