'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
//var db = require('../_db');

var Review = function(db) {
    return db.define('reviews', {
        title: {
            type: Sequelize.STRING
        },
        stars: {
            type: Sequelize.INTEGER,
            validate: {
                max: 5 //might be unnecessary depending on the form
            }
        },
        text: {
            type: Sequelize.TEXT(medium)
        },
        helpful: {
            type: Sequelize.BOOLEAN
        }
    })
}


module.exports = Review;