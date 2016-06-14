'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

// Order model is for both carts and orders

var Order = function(db) {
    return db.define('orders', {
        status: {
            type: Sequelize.ENUM('Shipped', 'Delivered', 'Cancelled', 'Returned', 'Pending', 'Processed'),
            defaultValue: 'Pending'
        },
        confirmation: {
            // confirmation number
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0
        }
    });
};

module.exports = Order;
