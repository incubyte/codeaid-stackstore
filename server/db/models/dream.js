'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

// Must have title, description, price, and inventory quantity
// Must belong to at least one category
// If there is no photo, there must be a placeholder photo used


var Dream = function(db) {
    return db.define('dream', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        category: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false
                //defaultValue: placeholder
        }
    }, {
        instanceMethods: {
            decreaseQuantityByOne: function() {
                this.quantity--;
            }
        }
    });
};

module.exports = Dream;
