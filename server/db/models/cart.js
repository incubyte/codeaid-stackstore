'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var User = require('./user.js');

//cart model has array of dreamIds, total price

module.exports = function(db) {
    var Cart = db.define('cart', {
            dreams: Sequelize.ARRAY(Sequelize.INTEGER),
            total: Sequelize.FLOAT
        }
    )
    // Cart.belongsTo(User(db));
}


