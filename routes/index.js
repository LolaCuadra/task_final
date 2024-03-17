const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/theme', require('./theme'));
router.use('/task', require('./task')); 
router.use('/team', require('./team'));

module.exports = router;
