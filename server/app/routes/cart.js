'use strict';

const express = require('express');
const router = express.Router();
const $Promise = require('bluebird');
var Order = require('../../db').model('orders');
var User = require('../../db').model('user');
var Dream = require('../../db').model('dream');
var OrderItems = require('../../db').model('orderItems');

module.exports = router;

router.post('/:id', function(req, res, next) {
    Dream.findById(req.body.product.id)
        .then(function(dream) {
            dream.update({
                quantity: dream.quantity - Number(req.body.amount)
            });
        });
    var order;
    Order.findOrCreate({
            where: {
                userId: req.user.id
            }
        })
        .then(function(data) {
            order = data;
            return OrderItems.create({
                dreamId: req.body.product.id,
                orderId: order[0].id,
                amount: req.body.amount,
                priceAtPurchase: req.body.product.price
            });
        })
        .then(function() {
            return Order.findById(order[0].id, {
                include: [OrderItems, Dream]
            });

        })
        .then(function(order) {
            res.json(order);
        });
});

router.put('/:id', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {
    var orderItems, theDreams, amountPurchased;
    Order.findOne({
            where: {
                userId: req.user.id
            }
        })
        .then(function(order) {
            return order.getOrderItems();
        })
        .then(function(items) {
            orderItems = items;
            return $Promise.map(items, function(item) {
                return item.getDream();
            });
        })
        .then(function(dreams) {
            theDreams = dreams;
            return $Promise.map(orderItems, function(item) {
                return parseFloat(item.amount) * item.priceAtPurchase;
            });
        })
        .then(function(prices) {
            return prices.reduce(function(a, b) {
                return a + b;
            }, 0);
        })
        .then(function(total) {
            res.json({ items: orderItems, dreams: theDreams, total: total });
        });
});
