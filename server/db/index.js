'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user')(db);
var Dream = require('./models/dream')(db);
//var Cart = require('./models/cart')(db);
var Review = require('./models/reviews')(db);
var Order = require('./models/orders')(db);

User.hasMany(Order);
User.hasMany(Review);
Order.belongsTo(User);
Order.belongsTo(Dream);
Review.belongsTo(User);
Review.belongsTo(Dream);
Dream.hasMany(Review);

//Order.belongsToMany(Dream, { through: 'DreamOrder'});
User.belongsToMany(Dream, {through: 'DreamUser'});

