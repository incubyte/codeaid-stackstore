'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
//var db = require('../_db');

var Order = function(db) {
    return db.define('orders', {
        status: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        confirmation: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.DECIMAL(10, 2)
        }
    })
};


module.exports = Order;
