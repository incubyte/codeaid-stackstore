'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Dream = require('./models/dream')(db);
//var Cart = require('./models/cart')(db);
var Review = require('./models/reviews')(db);
var Order = require('./models/orders')(db);
var OrderItems = require('./models/order-items-model')(db);

User.hasMany(Order);
User.hasMany(Review);

Review.belongsTo(User);
Review.belongsTo(Dream);

Dream.hasMany(Review);

Order.hasMany(OrderItems);
Order.belongsTo(User);
//Order.belongsToMany(OrderItems, {through: 'items_on_order'});
OrderItems.belongsTo(Dream);

Order.belongsToMany(Dream, { through: OrderItems});
// User.belongsToMany(Dream, {through: 'DreamUser'});