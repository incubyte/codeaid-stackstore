'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var db = require('../_db');

var Review = db.define('reviews', {
		title: {
			type: Sequelize.STRING
		},
		productId: {
			type: Sequelize.INTEGER
		},
		stars: {
			type: Sequelize.INTEGER,
			validate: {
				max: 5 //might be unnecessary depending on the form
			}
		},
		text: {
			type: Sequelize.TEXT
		},
		helpful: {
			type: Sequelize.BOOLEAN
		}
	})


module.exports = Review;