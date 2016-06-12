// 'use strict';
// var crypto = require('crypto');
// var _ = require('lodash');
// var Sequelize = require('sequelize');
// //var db = require('../_db');

// //cart model has array of dreamIds, total price

// module.exports = function(db) {
//     return db.define('cart', {}, {
//         getterMethods: {
//             getTotal: function() {
//                 return this.getDreams()
//                     .then(function(dreams) {
//                         return dreams.reduce(function(a, b) {
//                             console.log(a, b);
//                             return a + b.price;
//                         }, 0);
//                     });
//             }
//         }
//     });
// };
