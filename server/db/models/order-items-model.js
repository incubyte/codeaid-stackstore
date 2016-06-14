'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');


var OrderItems = function(db) {
    return db.define('orderItems', {
        amount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        priceAtPurchase: {
          type: Sequelize.DECIMAL,
          allowNull: false
        }
    });
};

module.exports = OrderItems;