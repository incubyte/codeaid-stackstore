'use strict';

const express = require('express');
const router = express.Router();
var Cart = require('../../db').model('orders');

module.exports = router;

router.post('/:id', function(req, res, next) {
    Cart.findOne({
            where: {
                userId: req.params.id
            }
        })
        .then(function(theUsersCart) {
            var updatedCart;
            if (!theUsersCart) {
                updatedCart = Cart.create({
                    userId: req.params.id
                });
            } else {
                updatedCart = theUsersCart;
                console.log("WHEN CART IS FOUND", updatedCart);
            }
            return updatedCart;
        })
        .then(function(cart) {
            cart.addDream(req.body.id);
            cart.getTotal.then(function(total) {
                cart.total = total;
                res.json({ cart, total });
            });
        });
});

router.get('/:id', function(req, res, next) {
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
