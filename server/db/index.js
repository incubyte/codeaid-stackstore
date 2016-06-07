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

console.log("What's the dealio?", Cart.associations);


Dream.create({
        title: "Classic",
        description: "hello",
        price: 12.33,
        quantity: 12,
        category: ["hi"],
        photo: "I'm a photo"
    })
    // 'use strict';
    // const db = require('./db');
    // const chalk = require('chalk');

// // Require our models. Running each module registers the model into sequelize
// // so any other part of the application can simply call sequelize.model('User')
// // to get access to the User model.
// require('./models');

// // Syncing all the models at once. This promise is used by main.js.
// var syncedDbPromise = db.sync();

// syncedDbPromise.then(function () {
//   console.log(chalk.green('Sequelize models synced to PostgreSQL'));
// });

// module.exports = syncedDbPromise;
