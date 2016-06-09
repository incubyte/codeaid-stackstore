'use strict';

const express = require('express');
const router = express.Router();

var Dream = require('../../db').model('dream');
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
            res.json({dream: theDream, sessionId: req.session.id});
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
