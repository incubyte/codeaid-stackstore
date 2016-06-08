'use strict';

const express = require('express');
const router = express.Router();

var Cart = require('../../db').model('cart');
module.exports = router;

// router.get('/', function(req, res, next) {
//   console.log("cart!");
//     Cart.findAll({ where: req.query })
//         .then(function(cart) {
//             res.json(cart);
//         })
//         .catch(next);
// });

router.get('/:id', function(req, res, next) {
  console.log("before findAll in cart id");
    Cart.findAll({
            where: { 
              id: req.params.id 
            }
        })
        .then(function(theUsersCart) {
            res.json(theUsersCart);
        })
        .catch(next);
});