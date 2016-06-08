'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Dream = require('./models/dream')(db);
var Cart = require('./models/cart')(db);
var Review = require('./models/reviews')(db);
var Order = require('./models/orders')(db);

Cart.belongsTo(User);
Review.belongsTo(User);
Order.belongsTo(User);


// Cart.create({
//   dreams: [1, 2],
//   total: 1111111.00,
//   userId: 2
// });
