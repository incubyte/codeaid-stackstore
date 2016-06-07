'use strict';
//var db = require('./_db');

var User = require('./user');
var Dream = require('./dream');
var Cart = require('./cart');
var Review = require('./reviews');
var Order = require('./orders');


Cart.belongsTo(User);
Review.belongsTo(User);
Order.belongsTo(User);


module.exports = {
	//db: db,
	User: User,
	Dream: Dream,
	Cart: Cart,
	Review: Review,
	Order: Order
};