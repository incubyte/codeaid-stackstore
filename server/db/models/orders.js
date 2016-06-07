'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function(db){
	db.define('orders', {
		status: {
			type: Sequelize.ARRAY(Sequelize.TEXT)
		},
		confirmation: {
			type: Sequelize.STRING
		},
		total: {
			type: Sequelize.DECIMAL(10, 2)
		}
	});
};