'use strict';

const express = require('express');
const router = express.Router();
const $Promise = require('bluebird');
var Order = require('../../db').model('orders');
var User = require('../../db').model('user');
var Dream = require('../../db').model('dream');
var OrderItems = require('../../db').model('orderItems');

module.exports = router;
router.use(function(req, res, next) {
    var order;

    if (req.user)
        order = Order.findOrCreate({
            where: {
                userId: req.user.id
            }
        })
        .then(([theOrder]) => theOrder)
    else if (req.session.orderId) {
        order = Order.findById(req.session.orderId)
    } else {
        order = Order.create({ user: req.user })
    }

    order
        .then(function(theOrder) {
            req.session.orderId = theOrder.id;
            req.order = theOrder;
            next();
        })

})
router.post('/', function(req, res, next) {
    Dream.findById(req.body.product.id)
        .then(function(dream) {
            dream.update({
                quantity: dream.quantity - Number(req.body.amount)
            });
        })
    OrderItems.create({
            dreamId: req.body.product.id,
            orderId: req.order.id,
            amount: req.body.amount,
            priceAtPurchase: req.body.product.price
        })
        .then(function(orderItems) {
            res.json(orderItems);
        })
});

router.put('/:id', function(req, res, next) {
    Dream.findById(req.body.dream.id)
        .then(function(dream) {
            dream.update({
                quantity: dream.quantity + Number(req.body.amountPurchased)
            })
        });
    OrderItems.findOne({
            where: {
                dreamId: req.body.dream.id
            }
        })
        .then(function(item) {
            return item.destroy();
        })
        .then(function(destroyedItem) {
            res.sendStatus(200);
            next();
        });

});

router.get('/', function(req, res, next) {
    var orderItems, theDreams, amountPurchased;
    Order.findOne({
            where: {
                id: req.order.id,
                status: "Pending"
            }
        })
        .then(function(order) {
            if (order) return order.getOrderItems();
            else res.status(200).send();
        })
        //req.order.getOrderItems()
        .then(function(items) {
            orderItems = items;
            return $Promise.map(items, function(item) {
                return item.getDream()
                    .then(function(dream) {
                        return { dream: dream.dataValues, amountPurchased: item.amount };
                    });
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
