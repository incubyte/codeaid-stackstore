'use strict';

const express = require('express');
const router = express.Router();

var Cart = require('../../db').model('cart');
module.exports = router;



router.get('/:id', function(req, res, next) {
  console.log("before findAll in cart id");
    Cart.findOne({
            where: { 
              userId: req.params.id 
            }
        })
        .then(function(theUsersCart) {
            res.json(theUsersCart);
        })
        .catch(next);
});