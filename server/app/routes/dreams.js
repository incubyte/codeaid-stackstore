'use strict';

const express = require('express');
const router = express.Router();

var Dream = require('../../db').model('dream');
var Review = require('../../db').model('reviews');
var User = require('../../db').model('user');

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

router.get('/:id/reviews', function(req, res, next) { //get all reviews for a dream
    Review.findAll({
            where: {
                dreamId: req.params.id
            }, 
            include: [User, Dream]
        })
        .then(function(reviews) {
            //console.log("Here are the reviews and their associations", reviews);
            res.json(reviews)
        })
        .catch(next)
})

router.post('/:id/reviews', function(req, res, next) { //get all reviews for a dream
        Review.create({
            title: req.body.title,
            text: req.body.text,
            userId: req.body.userId,
            dreamId: req.body.dreamId
        })
        .then(function(review) {

            console.log("This is the new review", review)
            res.json(review);

        })
        .catch(next)
})
