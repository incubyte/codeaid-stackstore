'use strict';

const express = require('express');
const router = express.Router();
var _ = require('lodash');
var User = require('../../db').model('user');
var Order = require('../../db').model('orders');
var OrderItems = require('../../db').model('orderItems');

module.exports = router;

// Get ALL orders for user
router.get('/:id', function(req, res, next){
  Order.findAll({
  	where: {
  		status: 'Pending',
  		userId: req.user.id
  	}
  })
  .then(function(orders){
  	res.json(orders);
  })
  .catch(next);
});

router.put('/:id', function(req, res, next){
	var processedOrder;
	Order.findOne({
		userId: req.user.id
	})
	.then(function(order){
		order.update({
			status: 'Processed'
		})
	})
	.then(function(order){
		processedOrder = order;
		return order.getOrderItems();
	})
	.then(function(items){
		return items.destroy();
	})
	.then(function(){
		res.json(processedOrder);
	})
})