'use strict';

const express = require('express');
const router = express.Router();

var Dream = require('../../db/models').Dream;
module.exports = router;

router.get('/', function(req, res, next) {
    Dream.findAll({ where: req.query })
        .then(function(dreams) { 
        	res.json(dreams);
        })
        .catch(next);
});

