'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

//cart model has array of dreamIds, total price

module.exports = function(db) {
    db.define('cart', {
            dreams: Sequelize.ARRAY(Sequelize.INTEGER),
            total: Sequelize.FLOAT
        }
    )
}
