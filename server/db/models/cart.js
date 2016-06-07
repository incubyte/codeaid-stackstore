'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
const db = require('../_db');

//cart model has array of dreamIds, total price




module.exports = db.define('cart', {
        dreams: Sequelize.ARRAY(Sequelize.INTEGER),
        total: Sequelize.FLOAT
    }, {
        classMethods: {
            // associate: function(models) {
            //     Cart.belongsTo(models.User, { foreignKey: 'userId' });
            // }
        }
    })
    // Cart.belongsTo(User(db));

