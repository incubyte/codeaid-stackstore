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
            user.addDream(req.body.id)
                .then(function() {

                    Dream.findById(req.body.id)
                        .then(function(dream) {
                            dream.update({
                                quantity: Number(req.body.quantity) - 1
                            });
                        });

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
});

router.get('/:id', function(req, res, next) {
    User.findById(req.params.id)
        .then(function(user) {
            console.log("USER", user);
            return user.getDreams();
        })
        .then(function(dreams) {
            console.log("USERS DREAMS", dreams);
            var total = dreams.reduce(function(a,b){
                return a + b.price
            }, 0);
            res.json({dreams: dreams, total: total});
        });
});
