'use strict';

const express = require('express');
const router = express.Router();
var _ = require('lodash');
var User = require('../../db').model('user');
var Order = require('../../db').model('order');

module.exports = router;

// Get ALL orders for user
router.get('/', function(req, res, next){
  Order.findAll()
  .then(function(){

  })
  .catch(next);
});