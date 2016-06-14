'use strict';

const express = require('express');
const router = express.Router();
var _ = require('lodash');
var User = require('../../db').model('user');
var Order = require('../../db').model('orders');
var OrderItems = require('../../db').model('orderItems');

module.exports = router;

// Get ALL orders for user
router.get('/:id', function(req, res, next) {
    Order.findAll({
            where: {
                status: 'Pending',
                userId: req.user.id
            }
        })
        .then(function(orders) {
            res.json(orders);
        })
        .catch(next);
});

router.put('/', function(req, res, next) {
    var processedOrder;
    if (req.user) {
        Order.findOne({
                where: {
                    userId: req.user.id
                }
            })
            .then(function(order) {
                order.update({
                    status: 'Processed'
                })
            })
            .then(function(processedOrder) {
                res.json(processedOrder);
            })
    } else {
        Order.findById(req.session.orderId)
            .then(function(order) {
                order.update({
                    status: 'Processed'
                })
            })
            .then(function(processedOrder) {
                res.json(processedOrder);
            })
    }
})
