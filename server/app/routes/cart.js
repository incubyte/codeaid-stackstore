'use strict';

const express = require('express');
const router = express.Router();

var Cart = require('../../db').model('cart');
module.exports = router;

router.post('/:sid/:id', function(req, res, next){
    Cart.findOne({
        where: {
            userId: req.params.id
        }
    })
    .then(function(theUsersCart){
        if (!theUsersCart) {
            Cart.create({
                userId: req.params.id,
                dreams: [req.body.product.id],
                total: req.body.product.price
            })
        }
        else {
            theUsersCart.update({
                dreams: theUsersCart.addToDream(req.body.product.id),
                total: theUsersCart.addToTotal(req.body.product.price)
            })
        }
    })
});

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
