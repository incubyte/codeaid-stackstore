'use strict';

const express = require('express');
const router = express.Router();

var Dream = require('../../db').model('dream');
var Review = require('../../db').model('reviews');
var User = require('../../db').model('user');

module.exports = router;

//get ALL of the dreams
router.get('/', function(req, res, next) {
    Dream.findAll({ where: req.query })
        .then(function(dreams) {
            res.json(dreams);
        })
        .catch(next);
});

//get ONE dream by id
router.get('/:id', function(req, res, next) {
    Dream.findById(req.params.id)
        .then(function(theDream) {
            if (!theDream) {
                res.sendStatus(404)
            } else {
                res.json(theDream);
            }
        })
        .catch(next);
});

//post ONE dream for admin
router.post('/', function(req, res, next) {
    if (!req.user.isAdmin) {
        res.sendStatus(403);
    } else {
        Dream.create(req.body)
            .then(function(newDreamCreated) {
                res.status(201).send(newDreamCreated);
            })
            .catch(next)
    }

})

//update ONE dream for admin
router.put('/:id', function(req, res, next) {
    if (!req.user.isAdmin) {
        res.sendStatus(403);
    } else {
        Dream.findById(req.params.id)
            .then(function(theDream) {
                if (!theDream) {
                    res.sendStatus(404)
                }
                return theDream.update(req.body)
            })
            .then(function(updatedDream) {
                res.json(updatedDream)
            })
            .catch(next)
    }
})

//delete ONE dream for admin
router.delete('/:id', function(req, res, next) {
    if (!req.user.isAdmin) {
        res.sendStatus(403);
    } else {
        Dream.findById(req.params.id)
            .then(function(theDream) {
                return theDream.destroy()
            })
            .then(function() {
                res.sendStatus(204)
            })
            .catch(next)
    }
})

//get ALL dreams in one category
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

//get ALL reviews for one dream
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

//post ONE review to one dream
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
