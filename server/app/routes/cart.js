'use strict';

const express = require('express');
const router = express.Router();
var Cart = require('../../db').model('orders');
var User = require('../../db').model('user');
var Dream = require('../../db').model('dream');

module.exports = router;

router.post('/:id', function(req, res, next) {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(user) {
            Cart.findOne({
                where: {
                    userId: user.id
                }
            })
            .then(function(cart){
                if (!cart) {
                    Cart.create({
                        
                    })
                }
            })
            return user.addDream(req.body.product.id)
                .then(function() {

                    return Dream.findById(req.body.product.id)
                        .then(function(dream) {
                            dream.update({
                                quantity: Number(req.body.product.quantity) - req.body.amount
                            });
                        })
                        .then(function(dream){
                            return user.getDreams().then(function(dreams){
                                return dreams.reduce(function(a,b){
                                    if (b === dream) return a + b.price*req.body.amount;
                                    else return a + b.price;
                                }, 0);
                            });
                        });

                    // return user.getDreams().then(function(dreams) {
                    //     return dreams.reduce(function(a, b) {
                    //         return a + b.price;
                    //     }, 0)
                    // });

                })
                .then(function(total) {
                    res.json({ user: user, total: total, amount: req.body.amount});
                });
        })
});

router.put('/:id', function(req, res, next){

});

router.get('/:id', function(req, res, next) {
    User.findById(req.params.id)
        .then(function(user) {
            return user.getDreams();
        })
        .then(function(dreams) {
            var total = dreams.reduce(function(a,b){
                return a + b.price
            }, 0);
            res.json({dreams: dreams, total: total});
        });
});
