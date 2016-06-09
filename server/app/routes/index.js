'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/dreams', require('./dreams'));
router.use('/cart', require('./cart'));
// router.use('/orders', require('./orders'));
// router.use('/reviews', require('./reviews'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
