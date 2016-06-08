'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
//var db = require('../_db');

//cart model has array of dreamIds, total price

module.exports = function(db) {
        return db.define('cart', {
            dreams: Sequelize.ARRAY(Sequelize.INTEGER),
            total: Sequelize.FLOAT
        }, {
            classMethods: {
                // associate: function(models) {
                //     Cart.belongsTo(models.User, { foreignKey: 'userId' });
                // }
            }
        });
    };
