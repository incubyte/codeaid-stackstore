'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
//var db = require('../_db');

//cart model has array of dreamIds, total price

module.exports = function(db) {
    return db.define('cart', {
        dreams: Sequelize.ARRAY(Sequelize.INTEGER),
        total: {
            type: Sequelize.FLOAT,
            defaultValue: 0.00
        }
    }, {
        instanceMethods: {
            // associate: function(models) {
            //     Cart.belongsTo(models.User, { foreignKey: 'userId' });
            // }
            addToDream: function(dreamId){
                this.dreams.push(dreamId);
                return this.dreams;
            },
            addToTotal: function(price){
                return this.total + price;
            }
        }
    });
};
