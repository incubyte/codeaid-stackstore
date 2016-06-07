'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Dream = require('./models/dream');
var Cart = require('./models/cart');
var Review = require('./models/reviews');
var Order = require('./models/orders');

Cart.belongsTo(User);
Review.belongsTo(User);
Order.belongsTo(User);

// console.log("What's the dealio?", Cart.associations);

// Cart.create({
//   dreams: [1, 2],
//   total: 1111111.00,
//   userId: 2
// });
