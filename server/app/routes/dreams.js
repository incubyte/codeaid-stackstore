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
            }
        })
        .then(function(reviews) {
            //console.log("WTF", reviews);
            res.json(reviews)
        })
        .catch(next)
})

router.post('/:id/reviews', function(req, res, next) { //get all reviews for a dream
    console.log("Here is my query: ", req.body)
    Review.create({
            title: req.body.title,
            text: req.body.text
        })
        .then(function(review) {
            User.findById(req.body.userId)
                .then(function(user) {
                    review.setUser(user);
                })

            Dream.findById(req.body.dreamId)
                .then(function(dream) {
                    review.setDream(dream);
                })


        })
        .catch(next)
})
