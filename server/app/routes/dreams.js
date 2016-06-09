'use strict';

const express = require('express');
const router = express.Router();

var Dream = require('../../db').model('dream');
var Review = require('../../db').model('reviews');

module.exports = router;

router.get('/', function(req, res, next) {
    Dream.findAll({ where: req.query })
        .then(function(dreams) {
            res.json(dreams);
        })
        .catch(next);
});

router.get('/:id', function(req, res, next) {
    Dream.findOne({
            where: { id: req.params.id }
        })
        .then(function(theDream) {
            res.json(theDream);
        })
        .catch(next);
});

router.get('/category/:category', function(req, res, next) {
    Dream.findAll({
            where: {
                category: {
                    $contains: [req.params.category]
                }
            }


        })
        .then(function(dreams) {
            res.json(dreams);
        })
        .catch(next);
});

router.get('/:id/reviews', function(req, res, next) {
    Review.findAll({
        where: {
            productId: req.params.id
        }
    })
    .then(function(reviews) {
        res.json(reviews)
    })
    .catch(next)
})
