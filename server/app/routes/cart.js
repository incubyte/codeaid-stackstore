'use strict';

const express = require('express');
const router = express.Router();
var Cart = require('../../db').model('orders');
var User = require('../../db').model('user');

module.exports = router;

router.post('/:id', function(req, res, next) {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(user) {
            user.addDream(req.body.id)
                .then(function(addedDream) {
                    return user.getDreams().then(function(dreams) {
                        return dreams.reduce(function(a, b) {
                            return a + b.price;
                        }, 0)
                    });

                })
                .then(function(total) {
                    res.json({ user: user, total: total });
                });
        })

    // Cart.findOne({
    //         where: {
    //             userId: req.params.id
    //         }
    //     })
    //     .then(function(theUsersCart) {
    //         var updatedCart;
    //         if (!theUsersCart) {
    //             updatedCart = Cart.create({
    //                 userId: req.params.id
    //             });
    //         } else {
    //             updatedCart = theUsersCart;
    //         }
    //         return updatedCart;
    //     })
    //     .then(function(cart) {
    //         cart.addDream(req.body.id)
    //         .then(function(addedDream){
    //             cart.getTotal().then(function(total){
    //                 res.json({cart, total});
    //             })
    //         });
    //     });
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
