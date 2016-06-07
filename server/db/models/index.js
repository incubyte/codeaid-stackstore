'use strict';
var db = require('../index');

var User = require('./user.js')(db);
var Dream = require('./dream')(db);
var Cart = require('./cart.js')(db);
var Review = require('./reviews')(db);
var Order = require('./orders')(db);


// Cart.belongsTo(User);
// Review.belongsTo(User);
// Order.belongsTo(User);


module.exports = {
	//db: db,
	User: User,
	Dream: Dream,
	Cart: Cart,
	Review: Review,
	Order: Order
};